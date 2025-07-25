import { getPopularMovies, getTopRatedTvShows, getTrending } from '@/lib/tmdb-api';
import { ContentCarousel } from '@/components/ContentCarousel';
import { HeroCarousel } from '@/components/HeroCarousel';

export default async function Home() {
  const popularMovies = await getPopularMovies();
  const topRatedTvShows = await getTopRatedTvShows();
  const trending = await getTrending();

  return (
    <div className="space-y-16">
      <HeroCarousel items={trending.slice(0, 5)} />
      <div className="container mx-auto px-4 py-8 space-y-16">
        <ContentCarousel title="Trending Now" items={trending} />
        <ContentCarousel title="Popular Movies" items={popularMovies} />
        <ContentCarousel title="Top Rated TV Shows" items={topRatedTvShows} />
      </div>
    </div>
  );
}
