import { useParams } from 'react-router-dom'
import { useGetFilmById } from '../hooks/useGetFilmById'
import FilmDetails from '../components/film/Details'

export default function FilmPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useGetFilmById(id ?? '')

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500 text-lg font-semibold">Loading...</div>
      </div>
    )
  }

  if (error || !data || !data.success) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500 text-lg">Film not found</div>
      </div>
    )
  }

  return (
    <FilmDetails data={data} />
  )
}