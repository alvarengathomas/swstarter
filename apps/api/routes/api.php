<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StarWarsController;

Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'timestamp' => now()]);
});

Route::get('/search', [StarWarsController::class, 'search']);
Route::get('/person/{id}', [StarWarsController::class, 'getPerson']);
Route::get('/film/{id}', [StarWarsController::class, 'getFilm']);
Route::get('/statistics', [StarWarsController::class, 'getStatistics']);
