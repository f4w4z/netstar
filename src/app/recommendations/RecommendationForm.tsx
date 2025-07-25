'use client';

import { useState } from 'react';
import { generateRecommendations } from '@/ai/flows/generate-recommendations';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

async function handleRecommendation(viewingHistory: string) {
  'use server';
  try {
    const result = await generateRecommendations({ viewingHistory });
    return result.recommendations;
  } catch (error) {
    console.error(error);
    return 'An error occurred while generating recommendations.';
  }
}

export function RecommendationForm() {
  const [history, setHistory] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!history.trim()) return;

    setIsLoading(true);
    setRecommendations('');
    const result = await handleRecommendation(history);
    setRecommendations(result);
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
            </CardHeader>
            <CardContent>
                <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-accent"/>
                </div>
            </CardContent>
         </Card>
      )}

      {recommendations && !isLoading && (
        <Card className="border-2 border-accent">
          <CardHeader>
            <CardTitle className="font-headline">Here are your recommendations!</CardTitle>
            <CardDescription>Based on your viewing history, you might like these:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <p>{recommendations}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
