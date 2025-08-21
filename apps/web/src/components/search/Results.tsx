import { Link } from 'react-router-dom';
import type { SearchResult } from '../../types'

import { Button } from '../shared/Button';

interface ResultsProps {
  results: SearchResult[]
  isLoading: boolean
  error: Error | null
}

export default function Results({ results, isLoading, error }: ResultsProps) {
  return (
    <div className="bg-white p-4 md:p-8 rounded-lg border border-gray-300 shadow-sm min-h-[400px] w-full">
      <h2 className="font-bold text-gray-900 text-lg pb-2 border-b border-gray-200 mb-2">
        Results
      </h2>
      <div className="min-h-[300px] flex flex-col w-full">
        {error ? (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 border border-red-300 font-semibold">
            {error.message}
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center text-gray-400 h-[400px] text-base font-semibold">
            Searching...
          </div>
        ) : results.length > 0 ? (
          <div className="flex flex-col w-full">
            {results.map((result, index) => (
              <div 
                key={result.uid} 
                className={`flex flex-col md:flex-row justify-between items-start md:items-center py-2 gap-2 md:gap-0 ${index < results.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <span className="w-full text-center text-gray-900 text-base font-bold md:w-fit md:text-left">
                  {result.properties.name || result.properties.title}
                </span>
                <Link to={result.properties.name ? `/person/${result.uid}` : `/film/${result.uid}`}>
                  <Button
                    size="sm"
                    variant="primary"
                    className="w-full md:w-auto"
                  >
                    SEE DETAILS
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-[400px]">
            <p className="text-gray-400 mb-2 text-base font-semibold">There are zero matches.</p>
            <p className="text-gray-400 text-sm font-semibold">Use the form to search for People or Movies.</p>
          </div>
        )}
      </div>
    </div>
  )
}