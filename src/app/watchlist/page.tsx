'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/hooks/useAppContext';
import { ContentCard } from '@/components/ContentCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function WatchlistPage() {
  const { user, watchlist } = useAppContext();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (localStorage.getItem('reelsharper-user') === null) {
      router.push('/login');
    }
  }, [router]);

  if (!isClient || user === undefined) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-auto w-full aspect-[2/3]" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    // This state is briefly visible before redirect, or if redirect fails.
    return (
      <div className="container mx-auto flex flex-col items-center justify-center text-center py-16">
        <h1 className="text-2xl font-headline mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-6">You need to be logged in to view your watchlist.</p>
        <Button asChild>
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-headline font-bold mb-6">My Watchlist</h1>
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {watchlist.map(item => (
            <ContentCard key={`${item.type}-${item.id}`} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">Your watchlist is empty.</p>
          <p className="text-sm text-muted-foreground">Add movies and TV shows to see them here.</p>
          <Button asChild variant="link" className="mt-4">
             <Link href="/">Browse Content</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
