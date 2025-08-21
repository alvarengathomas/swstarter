import { useParams } from 'react-router-dom'
import { useGetPersonById } from '../hooks/useGetPersonById'
import PersonDetails from '../components/person/Details'

export default function PersonPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useGetPersonById(id ?? '')

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
        <div className="text-gray-500 text-lg">Person not found</div>
      </div>
    )
  }

  return (
    <PersonDetails data={data} />
  )
}