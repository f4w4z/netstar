import { getContentDetails } from '@/lib/tmdb-api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { WatchlistButton } from '@/components/WatchlistButton';

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const movie = await getContentDetails(params.id);

  if (!movie || movie.type !== 'movie') {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Image
            src={movie.posterPath}
            alt={`Poster for ${movie.title}`}
            width={500}
            height={750}
            className="w-full h-auto object-cover border-2 border-border"
            data-ai-hint="movie poster"
          />
        </div>
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-4xl font-headline font-bold">{movie.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>{movie.releaseDate?.split('-')[0]}</span>
            {movie.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-accent" fill="currentColor" />
                <span>{movie.rating.toFixed(1)}</span>
              </div>
            )}
            <Badge variant="outline">Movie</Badge>
          </div>
          <p className="text-lg">{movie.overview}</p>
          <div className="pt-4">
            <WatchlistButton item={movie} />
          </div>
          {movie.cast && movie.cast.length > 0 && (
            <div>
              <h2 className="text-2xl font-headline font-bold mb-4">Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {movie.cast.map(member => (
                  <div key={member.id} className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-2">
                       <Image
                          src={member.profilePath}
                          alt={member.name}
                          fill
                          className="object-cover rounded-full border-2 border-border"
                          sizes="96px"
                          data-ai-hint="person portrait"
                       />
                    </div>
                    <p className="font-bold text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
