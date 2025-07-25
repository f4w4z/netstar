import { searchContent } from '@/lib/tmdb-api';
import { ContentCard } from '@/components/ContentCard';
import { Suspense } from 'react';

async function SearchResults({ query }: { query: string }) {
  const results = await searchContent(query);

  return (
    <>
      <h1 className="text-3xl font-headline font-bold mb-6">
        Search Results for &quot;{query}&quot;
      </h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {results.map(item => (
            <ContentCard key={`${item.type}-${item.id}`} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-16">No results found for &quot;{query}&quot;.</p>
      )}
    </>
  );
}

// Note: Using Suspense here is good practice for when search is slow.
// With local mock data, it's instantaneous, but this structure is scalable.
export default function SearchPage({ searchParams }: { searchParams?: { q?: string } }) {
  const query = searchParams?.q || '';

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
