import { getPopularMovies, getTopRatedTvShows, getTrending } from '@/lib/tmdb-api';
import { ContentCarousel } from '@/components/ContentCarousel';

export default async function Home() {
  const popularMovies = await getPopularMovies();
  const topRatedTvShows = await getTopRatedTvShows();
  const trending = await getTrending();

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      <ContentCarousel title="Trending Now" items={trending} />
      <ContentCarousel title="Popular Movies" items={popularMovies} />
      <ContentCarousel title="Top Rated TV Shows" items={topRatedTvShows} />
    </div>
  );
}
