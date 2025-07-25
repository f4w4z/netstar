
'use client';

import React, { createContext, useState, useEffect, ReactNode, useContext, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  // Stop loading when path changes
  useEffect(() => {
    if (pathname !== previousPathname.current) {
        setIsLoading(false);
        previousPathname.current = pathname;
    }
  }, [pathname]);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  
  const value = { isLoading, startLoading, stopLoading };

  // Wrap children in a div that captures clicks on Next Links
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let target = e.target as HTMLElement;
    while(target && target !== e.currentTarget) {
        // Check if the clicked element is a Next.js Link
        if (target.tagName === 'A' && target.hasAttribute('href') && target.getAttribute('href')?.startsWith('/')) {
           const currentHref = window.location.pathname + window.location.search + window.location.hash;
           const targetHref = target.getAttribute('href');
           if (currentHref !== targetHref) {
             startLoading();
           }
           break;
        }
        target = target.parentElement as HTMLElement;
    }
  }

  return <LoadingContext.Provider value={value}>
    <div onClick={handleClick}>{children}</div>
  </LoadingContext.Provider>;
}

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
