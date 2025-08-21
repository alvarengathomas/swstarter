import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useGetFilmById(filmId: string) {
  return useQuery({
    queryKey: ['film', filmId],
    queryFn: async () => {
      if (!filmId) return null;
      const res = await fetch(`${API_BASE_URL}/api/film/${filmId}`);
      if (!res.ok) throw new Error('Failed to fetch film');
      return res.json();
    },
    enabled: !!filmId,
  });
}
