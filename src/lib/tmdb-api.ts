'use server';

import { mockAllContent, mockDetails, mockMovies, mockTvShows, mockTrending } from './mock-data';
import type { ContentItem } from './types';

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getPopularMovies(): Promise<ContentItem[]> {
  await delay(100);
  return mockMovies;
}

export async function getTopRatedTvShows(): Promise<ContentItem[]> {
  await delay(100);
  return mockTvShows;
}

export async function getTrending(): Promise<ContentItem[]> {
    await delay(100);
    return mockTrending;
}

export async function getContentDetails(id: string): Promise<ContentItem | null> {
  await delay(100);
  const allContent = { ...mockDetails, ...mockAllContent.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}) };
  return allContent[id] || null;
}

export async function searchContent(query: string): Promise<ContentItem[]> {
  await delay(100);
  if (!query) return [];
  const lowerCaseQuery = query.toLowerCase();
  return mockAllContent.filter(item => item.title.toLowerCase().includes(lowerCaseQuery));
}
