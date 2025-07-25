'use server';

/**
 * @fileOverview Flow for generating personalized movie and TV show recommendations based on viewing history.
 *
 * - generateRecommendations - A function that generates movie/TV show recommendations.
 * - GenerateRecommendationsInput - The input type for the generateRecommendations function.
 * - GenerateRecommendationsOutput - The return type for the generateRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecommendationsInputSchema = z.object({
  viewingHistory: z
    .string()
    .describe('The viewing history of the user as a text string.'),
});
export type GenerateRecommendationsInput = z.infer<typeof GenerateRecommendationsInputSchema>;

const GenerateRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.object({
    title: z.string().describe("The title of the recommended movie or TV show."),
    year: z.number().describe("The release year of the movie or TV show."),
  })).describe('A list of recommended movies and TV shows based on the viewing history.'),
});
export type GenerateRecommendationsOutput = z.infer<typeof GenerateRecommendationsOutputSchema>;

export async function generateRecommendations(
  input: GenerateRecommendationsInput
): Promise<GenerateRecommendationsOutput> {
  return generateRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecommendationsPrompt',
  input: {schema: GenerateRecommendationsInputSchema},
  output: {schema: GenerateRecommendationsOutputSchema},
  prompt: `You are a movie and TV show recommendation expert.

  Based on the user's viewing history, provide a list of recommended movies and TV shows that the user might enjoy.
  For each recommendation, provide the title and the release year.

  Consider the user's preferences and suggest titles that are similar to what they have already watched.

  Here is the viewing history:
  {{viewingHistory}}`,
});

const generateRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateRecommendationsFlow',
    inputSchema: GenerateRecommendationsInputSchema,
    outputSchema: GenerateRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
