'use client';

import { Button } from '@/components/ui/button';
import { useAppContext } from '@/hooks/useAppContext';
import type { ContentItem } from '@/lib/types';
import { PlusCircle, CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface WatchlistButtonProps {
  item: ContentItem;
  variant?: 'add' | 'remove';
}

export function WatchlistButton({ item, variant = 'add' }: WatchlistButtonProps) {
  const { addToWatchlist, removeFromWatchlist, isOnWatchlist, user } = useAppContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a placeholder or nothing on the server
    return <Button disabled className="w-full md:w-auto"><PlusCircle /> Add to Watchlist</Button>;
  }

  const onList = isOnWatchlist(item.id);

  if (variant === 'remove') {
    return (
      <Button
        variant="destructive"
        onClick={() => removeFromWatchlist(item.id)}
        className="w-full"
        disabled={!user}
      >
        <XCircle /> Remove
      </Button>
    );
  }

  const handleClick = () => {
    if (onList) {
      removeFromWatchlist(item.id);
    } else {
      addToWatchlist(item);
    }
  };

  return (
    <Button onClick={handleClick} disabled={!user} className="w-full md:w-auto">
      {onList ? <><CheckCircle /> In Watchlist</> : <><PlusCircle /> Add to Watchlist</>}
    </Button>
  );
}
