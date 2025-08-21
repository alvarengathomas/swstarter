import { useGetStatistics } from '../hooks/useGetStatistics'

interface TopQuery {
  query: string
  count: number
  percentage: number
}

interface Statistics {
  total_searches: number
  top_queries: TopQuery[]
  average_response_time_ms: number
  peak_hour: number
  last_updated: string
}

function formatHour(hour: number) {
  if (hour === 0) return "12 AM";
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return "12 PM";
  return `${hour - 12} PM`;
}


export default function StatisticsPage() {
  const { data, isLoading, error } = useGetStatistics()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading statistics...</div>
      </div>
    )
  }

  if (error || !data || !data.success) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">{error?.message || 'Failed to load statistics'}</div>
      </div>
    )
  }

  const statistics: Statistics = data.statistics

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Usage Statistics</h1>
        <p className="text-gray-500 mt-2">Last updated: {new Date(statistics.last_updated).toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Searches</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{statistics.total_searches}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Avg Response Time</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{statistics.average_response_time_ms}ms</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Peak Hour</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{formatHour(statistics.peak_hour)}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Top Search Queries</h2>
        </div>
        <div className="p-6">
          {statistics.top_queries.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No search queries yet</p>
          ) : (
            <div className="space-y-4">
              {statistics.top_queries.map((query: TopQuery, index: number) => (
                <div key={query.query} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-green-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">"{query.query}"</p>
                      <p className="text-sm text-gray-500">{query.count} searches</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${query.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600 w-12 text-right">
                      {query.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Statistics are automatically recomputed every 5 minutes
        </p>
      </div>
    </div>
  )
}