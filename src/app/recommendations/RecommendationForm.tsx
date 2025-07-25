'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { handleRecommendation } from './actions';
import type { ContentItem } from '@/lib/types';
import { ContentCard } from '@/components/ContentCard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export function RecommendationForm() {
  const [history, setHistory] = useState('');
  const [recommendations, setRecommendations] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!history.trim()) return;

    setIsLoading(true);
    setRecommendations([]);
    setError(null);
    const result = await handleRecommendation(history);
    
    if (result.error) {
        setError(result.error);
    } else {
        setRecommendations(result.recommendations);
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="history" className="text-base font-medium">Your Viewing History</Label>
          <Textarea
            id="history"
            placeholder="e.g., The Matrix, Inception, Breaking Bad, The Office..."
            value={history}
            onChange={e => setHistory(e.target.value)}
            className="min-h-[100px] border-2"
          />
           <p className="text-sm text-muted-foreground">
            Enter a comma-separated list of movies and TV shows you've enjoyed.
          </p>
        </div>
        <Button type="submit" disabled={isLoading || !history.trim()}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Thinking...' : 'Get Recommendations'}
        </Button>
      </form>

      {isLoading && (
         <Card className="border-2 border-dashed">
            <CardHeader>
                <CardTitle className="font-headline">Generating Recommendations...</CardTitle>
                 <CardDescription>Our AI is searching for your next favorite show.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-accent"/>
                </div>
            </CardContent>
         </Card>
      )}

      {error && (
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Something went wrong!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendations.length > 0 && !isLoading && (
        <Card className="border-2 border-accent">
          <CardHeader>
            <CardTitle className="font-headline">Here are your recommendations!</CardTitle>
            <CardDescription>Based on your viewing history, you might like these:</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-6 gap-y-10">
                {recommendations.map(item => (
                    <ContentCard key={`${item.type}-${item.id}`} item={item} />
                ))}
             </div>
          </CardContent>
        </Card>
      )}

      {recommendations.length === 0 && !isLoading && !error && history && (
         <Card className="border-2 border-dashed">
         <CardHeader>
             <CardTitle className="font-headline">No Recommendations Found</CardTitle>
              <CardDescription>We couldn't find any recommendations based on your input. Try adding more titles.</CardDescription>
         </CardHeader>
      </Card>
      )}
    </div>
  );
}
