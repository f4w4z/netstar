'use client';

import React, { createContext, useState, useEffect, ReactNode, useRef } from 'react';
import type { ContentItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface User {
  name: string;
  email: string;
}

interface AppContextType {
  user: User | null;
  login: (credentials: { email: string }) => void;
  logout: () => void;
  watchlist: ContentItem[];
  addToWatchlist: (item: ContentItem) => void;
  removeFromWatchlist: (itemId: number) => void;
  isOnWatchlist: (itemId: number) => boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [watchlist, setWatchlist] = useState<ContentItem[]>([]);
  const { toast } = useToast();
  const prevWatchlistRef = useRef<ContentItem[]>([]);

  useEffect(() => {
    try {
      const storedWatchlist = localStorage.getItem('netstar-watchlist');
      if (storedWatchlist) {
        const parsedWatchlist = JSON.parse(storedWatchlist);
        setWatchlist(parsedWatchlist);
        prevWatchlistRef.current = parsedWatchlist;
      }
      const storedUser = localStorage.getItem('netstar-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Could not access localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('netstar-watchlist', JSON.stringify(watchlist));

      // Compare current watchlist with previous to determine if item was added or removed
      if (watchlist.length > prevWatchlistRef.current.length) {
        const addedItem = watchlist.find(item => !prevWatchlistRef.current.some(prevItem => prevItem.id === item.id));
        if (addedItem) {
          toast({
            title: 'Added to Watchlist',
            description: `"${addedItem.title}" has been added.`,
          });
        }
      } else if (watchlist.length < prevWatchlistRef.current.length) {
        const removedItem = prevWatchlistRef.current.find(prevItem => !watchlist.some(item => item.id === prevItem.id));
        if (removedItem) {
          toast({
            title: 'Removed from Watchlist',
            description: `"${removedItem.title}" has been removed.`,
          });
        }
      }

      prevWatchlistRef.current = watchlist;
    } catch (error) {
        console.error("Could not access localStorage:", error);
    }
  }, [watchlist, toast]);

  useEffect(() => {
    try {
        if (user) {
            localStorage.setItem('netstar-user', JSON.stringify(user));
        } else {
            localStorage.removeItem('netstar-user');
        }
    } catch (error) {
        console.error("Could not access localStorage:", error);
    }
  }, [user]);

  const login = (credentials: { email: string }) => {
    const mockUser = { name: 'Demo User', email: credentials.email };
    setUser(mockUser);
    toast({
      title: 'Login Successful',
      description: `Welcome back, ${mockUser.name}!`,
    });
  };

  const logout = () => {
    setUser(null);
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  const addToWatchlist = (item: ContentItem) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Login Required',
        description: 'You must be logged in to add items to your watchlist.',
      });
      return;
    }
    setWatchlist(prev => {
      if (prev.find(i => i.id === item.id)) {
        toast({
          title: 'Already in Watchlist',
          description: `"${item.title}" is already in your watchlist.`,
        });
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromWatchlist = (itemId: number) => {
    setWatchlist(prev => prev.filter(i => i.id !== itemId));
  };
  
  const isOnWatchlist = (itemId: number) => {
    return watchlist.some(item => item.id === itemId);
  };

  const value = {
    user,
    login,
    logout,
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isOnWatchlist,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
