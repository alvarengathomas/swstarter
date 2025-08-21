import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useGetSearchResults(query: string, type: 'people' | 'films') {
  return useQuery({
    queryKey: ['search', query, type],
    queryFn: async () => {
        const res = await fetch(`${API_BASE_URL}/api/search?query=${encodeURIComponent(query)}&type=${type}`);
        if (!res.ok) throw new Error('Failed to fetch search results');
        return res.json();
    },
    enabled: !!query && !!type,
    
  });
}
