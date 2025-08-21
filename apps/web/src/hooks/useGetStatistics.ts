import { useQuery } from '@tanstack/react-query'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export function useGetStatistics() {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/statistics`)
      if (!res.ok) throw new Error('Failed to fetch statistics')
      return res.json()
    },
  })
}
