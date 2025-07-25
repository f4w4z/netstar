'use server';

import { generateRecommendations } from '@/ai/flows/generate-recommendations';
import { searchContent } from '@/lib/tmdb-api';
import type { ContentItem } from '@/lib/types';

export async function handleRecommendation(viewingHistory: string): Promise<{
    recommendations: ContentItem[];
    error?: string;
  }> {
  try {
    const result = await generateRecommendations({ viewingHistory });
    
    if (!result.recommendations || result.recommendations.length === 0) {
        return { recommendations: [] };
    }
    
    const searchPromises = result.recommendations.map(rec => 
      searchContent(`${rec.title} ${rec.year}`)
    );

    const searchResults = await Promise.all(searchPromises);
    
    const recommendations: ContentItem[] = searchResults.map((res, index) => {
        // Find the best match, preferably one that matches the year
        const originalRec = result.recommendations[index];
        const bestMatch = res.find(item => item.releaseDate?.startsWith(originalRec.year.toString())) || res[0];
        return bestMatch;
    }).filter((item): item is ContentItem => !!item);

    // Remove duplicates
    const uniqueRecommendations = recommendations.reduce((acc, current) => {
        if (!acc.find(item => item.id === current.id)) {
            acc.push(current);
        }
        return acc;
    }, [] as ContentItem[]);


    return { recommendations: uniqueRecommendations };
  } catch (error) {
    console.error(error);
    return { recommendations: [], error: 'An error occurred while generating recommendations.' };
  }
}
