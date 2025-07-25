'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/hooks/useAppContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { RecommendationForm } from './RecommendationForm';

export default function RecommendationsPage() {
  const { user } = useAppContext();
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
      <div className="container mx-auto max-w-2xl px-4 py-8 space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-24" />
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center text-center py-16">
        <h1 className="text-2xl font-headline mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-6">Please log in to get AI-powered recommendations.</p>
        <Button asChild>
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="text-center mb-8">
          <h1 className="text-3xl font-headline font-bold">AI Recommendations</h1>
          <p className="text-muted-foreground">Tell us what you've watched, and we'll suggest what to watch next!</p>
      </div>
      <RecommendationForm />
    </div>
  );
}
