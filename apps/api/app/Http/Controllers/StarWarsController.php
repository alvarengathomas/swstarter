<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class StarWarsController extends Controller
{
  private const SWAPI_BASE_URL = 'https://www.swapi.tech/api';

  public function search(Request $request): JsonResponse
  {
      $request->validate([
          'query' => 'required|string|min:1',
          'type' => 'required|in:people,films'
      ]);

      $query = $request->query('query');
      $type = $request->query('type');

      try {
          $startTime = microtime(true);

          $this->trackSearchQuery($query, $type, $request->ip());

          $queryParam = $type === 'people' ? 'name' : 'title';
          $endpoint = self::SWAPI_BASE_URL . "/{$type}?{$queryParam}={$query}";

          $response = Http::get($endpoint);

          if ($response->successful()) {
              $data = $response->json();

              $endTime = microtime(true);
              $responseTime = ($endTime - $startTime) * 1000;
              $this->trackResponseTime($responseTime);

              return response()->json([
                  'success' => true,
                  'results' => $data,
              ]);
          }

          return response()->json([
              'success' => false,
              'message' => 'Failed to fetch data from Star Wars API'
          ], 500);

      } catch (\Exception $e) {
          Log::error('Search API error', [
              'error' => $e->getMessage(),
              'query' => $query,
              'type' => $type
          ]);

          return response()->json([
              'success' => false,
              'message' => 'An error occurred while searching'
          ], 500);
      }
  }

  public function getPerson(Request $request, string $id): JsonResponse
  {
      try {
          $response = Http::get(self::SWAPI_BASE_URL . "/people/{$id}");

          if ($response->successful()) {
              $data = $response->json();

              $person = $data['result']['properties'];
              $films = [];
              $filmIds = array_map('basename', $person['films']);

              $filmCache = [];
              $responses = Http::pool(fn ($pool) =>
                  array_map(fn ($filmId) =>
                      isset($filmCache[$filmId])
                          ? $filmCache[$filmId]
                          : $filmCache[$filmId] = $pool->get(self::SWAPI_BASE_URL . "/films/{$filmId}"),
                      $filmIds
                  )
              );

              foreach ($responses as $filmResponse) {
                  if ($filmResponse->successful()) {
                      $filmData = $filmResponse->json();
                      if (isset($filmData['result']['properties']['title'], $filmData['result']['uid'])) {
                          $films[] = [
                              'uid' => $filmData['result']['uid'],
                              'title' => $filmData['result']['properties']['title']
                          ];
                      }
                  }
              }

              return response()->json([
                  'success' => true,
                  'person' => $person,
                  'films' => $films
              ]);
          }

          return response()->json([
              'success' => false,
              'message' => 'Person not found'
          ], 404);

      } catch (\Exception $e) {
          Log::error('Get person API error', [
              'error' => $e->getMessage(),
              'person_id' => $id
          ]);

          return response()->json([
              'success' => false,
              'message' => 'An error occurred while fetching person details'
          ], 500);
      }
  }

  public function getFilm(Request $request, string $id): JsonResponse
  {
      try {
          $response = Http::get(self::SWAPI_BASE_URL . "/films/{$id}");

          if ($response->successful()) {
              $data = $response->json();

              $film = $data['result']['properties'];
              $characterIds = array_map('basename', $film['characters']);

              $characterCache = [];
              $responses = Http::pool(fn ($pool) =>
                  array_map(fn ($characterId) =>
                      isset($characterCache[$characterId])
                          ? $characterCache[$characterId]
                          : $characterCache[$characterId] = $pool->get(self::SWAPI_BASE_URL . "/people/{$characterId}"),
                      $characterIds
                  )
              );

              $characters = [];
              foreach ($responses as $characterResponse) {
                  if ($characterResponse->successful()) {
                      $characterData = $characterResponse->json();
                      if (isset($characterData['result']['properties']['name'], $characterData['result']['uid'])) {
                          $characters[] = [
                              'uid' => $characterData['result']['uid'],
                              'name' => $characterData['result']['properties']['name']
                          ];
                      }
                  }
              }

              return response()->json([
                  'success' => true,
                  'film' => $film,
                  'characters' => $characters
              ]);
          }

          return response()->json([
              'success' => false,
              'message' => 'Film not found'
          ], 404);

      } catch (\Exception $e) {
          Log::error('Get film API error', [
              'error' => $e->getMessage(),
              'film_id' => $id
          ]);

          return response()->json([
              'success' => false,
              'message' => 'An error occurred while fetching film details'
          ], 500);
      }
  }

  public function getStatistics(): JsonResponse
  {
      try {
          $statistics = Cache::get('search_statistics', [
              'total_searches' => 0,
              'top_queries' => [],
              'average_response_time_ms' => 0,
              'peak_hour' => 0,
              'last_updated' => now()->format('Y-m-d H:i:s')
          ]);

          return response()->json([
              'success' => true,
              'statistics' => $statistics
          ]);

      } catch (\Exception $e) {
          Log::error('Get statistics error', ['error' => $e->getMessage()]);

          return response()->json([
              'success' => false,
              'message' => 'An error occurred while fetching statistics'
          ], 500);
      }
  }

  private function trackSearchQuery(string $query, string $type, string $ip): void
  {
      $hour = now()->hour;

      // Track query frequency
      $queryCounts = Cache::get('query_counts', []);
      $queryKey = strtolower(trim($query));
      $queryCounts[$queryKey] = ($queryCounts[$queryKey] ?? 0) + 1;
      Cache::put('query_counts', $queryCounts, now()->addDays(7));

      // Track hourly searches
      $hourlyStats = Cache::get('hourly_stats', []);
      $hourlyStats[$hour] = ($hourlyStats[$hour] ?? 0) + 1;
      Cache::put('hourly_stats', $hourlyStats, now()->addDays(7));

      // Track total searches
      $totalSearches = Cache::get('total_searches', 0);
      Cache::put('total_searches', $totalSearches + 1, now()->addDays(7));

      // Log for debugging
      Log::info('Search query tracked', [
          'query' => $query,
          'type' => $type,
          'timestamp' => now(),
          'ip' => $ip
      ]);
  }

  private function trackResponseTime(float $responseTime): void
  {
      $responseTimes = Cache::get('response_times', []);
      $responseTimes[] = $responseTime;

      // Keep only last 1000 response times to avoid memory issues
      if (count($responseTimes) > 1000) {
          $responseTimes = array_slice($responseTimes, -1000);
      }

      Cache::put('response_times', $responseTimes, now()->addDays(7));
  }

  public function computeStatistics(): void
  {
      $queryCounts = Cache::get('query_counts', []);
      $hourlyStats = Cache::get('hourly_stats', []);
      $totalSearches = Cache::get('total_searches', 0);
      $responseTimes = Cache::get('response_times', []);

      // Calculate top 5 queries with percentages
      arsort($queryCounts);
      $topQueries = [];
      $count = 0;
      foreach ($queryCounts as $query => $queryCount) {
          if ($count >= 5) break;
          $topQueries[] = [
              'query' => $query,
              'count' => $queryCount,
              'percentage' => $totalSearches > 0 ? round(($queryCount / $totalSearches) * 100, 1) : 0
          ];
          $count++;
      }

      // Calculate average response time
      $averageResponseTime = count($responseTimes) > 0 ? round(array_sum($responseTimes) / count($responseTimes), 2) : 0;

      // Find peak hour
      $peakHour = 0;
      $maxSearches = 0;
      foreach ($hourlyStats as $hour => $searches) {
          if ($searches > $maxSearches) {
              $maxSearches = $searches;
              $peakHour = $hour;
          }
      }

      $statistics = [
          'total_searches' => $totalSearches,
          'top_queries' => $topQueries,
          'average_response_time_ms' => $averageResponseTime,
          'peak_hour' => $peakHour,
          'last_updated' => now()->format('Y-m-d H:i:s')
      ];

      Cache::put('search_statistics', $statistics, now()->addDays(7));

      Log::info('Statistics computed and cached', $statistics);
  }
}
