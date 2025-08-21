import { useState } from 'react'
import { Button } from '../shared/Button';

interface FormProps {
  onSearch: (query: string, type: 'people' | 'films') => void
  isLoading: boolean
}

export default function Form({ onSearch, isLoading }: FormProps) {
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState<'people' | 'films'>('people')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && !isLoading) {
      onSearch(query.trim(), searchType)
    }
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleTypeChange = (type: 'people' | 'films') => {
    setSearchType(type)
  }

  return (
  <div className="bg-white p-4 md:p-8 rounded-lg border border-gray-300 shadow-sm w-full">
      <h2 className="font-normal text-gray-900 text-lg mb-5">
        What are you searching for?
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
          <label className="flex items-center cursor-pointer text-gray-900 gap-2 text-base font-semibold">
            <div className="relative">
              <input
                type="radio"
                name="searchType"
                value="people"
                checked={searchType === 'people'}
                onChange={() => handleTypeChange('people')}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                searchType === 'people' ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
              }`}>
                {searchType === 'people' && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                )}
              </div>
            </div>
            People
          </label>
          
          <label className="flex items-center cursor-pointer text-gray-900 gap-2 text-base font-semibold">
            <div className="relative">
              <input
                type="radio"
                name="searchType"
                value="films"
                checked={searchType === 'films'}
                onChange={() => handleTypeChange('films')}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                searchType === 'films' ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
              }`}>
                {searchType === 'films' && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                )}
              </div>
            </div>
            Movies
          </label>
        </div>

        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder={searchType === 'people' ? 'e.g. Chewbacca, Yoda, Boba Fett' : 'e.g. A New Hope, Empire Strikes Back'}
          className="px-4 py-3 text-base border border-gray-300 rounded text-gray-700 transition-colors focus:outline-none focus:border-blue-500"
          disabled={isLoading}
        />

        <Button
          type="submit"
          size="md"
          variant={query.trim() && !isLoading ? 'primary' : 'secondary'}
          className="w-full"
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? 'SEARCHING...' : 'SEARCH'}
        </Button>
      </form>
    </div>
  )
}