import { useState } from 'react'
import type { SearchResult } from '../types'
import { useGetSearchResults } from '../hooks/useGetSearchResults'
import Form from '../components/search/Form'
import Results from '../components/search/Results'

type SearchType = 'people' | 'films'

export default function SearchPage() {
  const [query, setQuery] = useState<string>('')
  const [type, setType] = useState<SearchType>('people')
  const { data, isLoading, error } = useGetSearchResults(query, type)

  const handleSearch = (searchQuery: string, searchType: SearchType) => {
    setQuery(searchQuery)
    setType(searchType)
  }

  const searchResults: SearchResult[] =
    data && data.success ? data.results.result : []

  return (
    <div className="flex flex-col gap-7 items-start md:flex-row md:gap-7">
      <div className="w-full md:w-[380px] flex-none">
        <Form onSearch={handleSearch} isLoading={isLoading} />
      </div>
      <div className="w-full md:flex-1">
        <Results 
          results={searchResults} 
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  )
}