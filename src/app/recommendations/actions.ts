'use server';

import { generateRecommendations } from '@/ai/flows/generate-recommendations';

export async function handleRecommendation(viewingHistory: string) {
  try {
    const result = await generateRecommendations({ viewingHistory });
    return result.recommendations;
  } catch (error) {
    console.error(error);
    return 'An error occurred while generating recommendations.';
  }
}
