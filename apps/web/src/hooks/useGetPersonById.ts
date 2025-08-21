import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useGetPersonById(personId: string) {
  return useQuery({
    queryKey: ['person', personId],
    queryFn: async () => {
      if (!personId) return null;
      const res = await fetch(`${API_BASE_URL}/api/person/${personId}`);
      if (!res.ok) throw new Error('Failed to fetch person');
      return res.json();
    },
    enabled: !!personId,
  });
}
