import type { PersonData } from '../../types';
import { Button } from '../shared/Button';
import { Link } from '../shared/Link';
import { Link as RouterLink } from 'react-router-dom';
import { Title } from '../shared/Title';

interface DetailsProps {
  data: PersonData;
}

export default function Details({ data }: DetailsProps) {
  const { person, films } = data;

  const getRelevantDetails = () => [
    { label: 'Birth Year', value: person.birth_year },
    { label: 'Gender', value: person.gender },
    { label: 'Eye Color', value: person.eye_color },
    { label: 'Hair Color', value: person.hair_color },
    { label: 'Height', value: person.height },
    { label: 'Mass', value: person.mass }
  ];

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
      <Title>{person.name}</Title>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Details</h3>
          <div className="space-y-1">
            {getRelevantDetails().map(({ label, value }) => (
              <div key={label} className="text-sm text-gray-900">
                <span className="text-gray-900">{label}:</span>{' '}
                <span className="text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Movies</h3>
          <div className="space-y-2">
            {films.map((film: { uid: string; title: string }, index: number) => (
              <span key={film.uid}>
                <Link
                  href={`/film/${film.uid}`}
                >
                  {film.title}
                </Link>
                {index < films.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <RouterLink to="/">
        <Button
          size="md"
          variant="primary"
          className="mt-8"
        >
          BACK TO SEARCH
        </Button>
      </RouterLink>
    </div>
  );
}