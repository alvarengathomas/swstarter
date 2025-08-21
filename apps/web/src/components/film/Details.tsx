import type { FilmData } from '../../types'

import { Button } from '../shared/Button';
import { Link } from '../shared/Link';
import { Link as RouterLink } from 'react-router-dom';
import { Title } from '../shared/Title';

interface DetailsProps {
  data: FilmData;
}

export default function Details({ data }: DetailsProps) {
  const { film, characters } = data;

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
      <Title>{film.title}</Title>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Opening Crawl</h3>
          <div className="text-sm text-gray-700 space-y-3">
            {film.opening_crawl.split('\n\n').map((paragraph: string, index: number) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Characters</h3>
          <div className="text-sm space-y-1">
            {characters.map((character: { uid: string; name: string }, index: number) => (
              <span key={character.uid}>
                <Link
                  href={`/person/${character.uid}`}>
                  {character.name}
                </Link>
                {index < characters.length - 1 && ', '}
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