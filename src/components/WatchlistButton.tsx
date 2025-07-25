'use client';

import { Button } from '@/components/ui/button';
import { useAppContext } from '@/hooks/useAppContext';
import type { ContentItem } from '@/lib/types';
import { PlusCircle, CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface WatchlistButtonProps {
  item: ContentItem;
}

export function WatchlistButton({ item }: WatchlistButtonProps) {
  const { addToWatchlist, removeFromWatchlist, isOnWatchlist, user } = useAppContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a placeholder or nothing on the server to avoid hydration mismatch
    return <Button disabled className="w-full md:w-auto"><PlusCircle className="mr-2" /> Add to Watchlist</Button>;
  }

  const onList = isOnWatchlist(item.id);

  const handleClick = () => {
    if (!user) {
      // This logic is mostly handled in the context, but as a safeguard:
      alert('Please log in to manage your watchlist.');
      return;
    }
    if (onList) {
      removeFromWatchlist(item.id);
    } else {
      addToWatchlist(item);
    }
  };

  return (
    <Button onClick={handleClick} disabled={!user} className="w-full md:w-auto">
      {onList ? (
        <>
          <CheckCircle className="mr-2" /> In Watchlist
        </>
      ) : (
        <>
          <PlusCircle className="mr-2" /> Add to Watchlist
        </>
      )}
    </Button>
  );
}
