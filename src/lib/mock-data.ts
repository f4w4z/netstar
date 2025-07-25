import type { ContentItem } from './types';

export const mockMovies: ContentItem[] = [
  { id: 1, title: 'Dune: Part Two', posterPath: 'https://placehold.co/500x750/1a1a1a/ffffff', type: 'movie', 'data-ai-hint': 'sci-fi desert' },
  { id: 2, title: 'Oppenheimer', posterPath: 'https://placehold.co/500x750/1a1a1a/ffffff', type: 'movie', 'data-ai-hint': 'man suit' },
  { id: 3, title: 'The Creator', posterPath: 'https://placehold.co/500x750/1a1a1a/ffffff', type: 'movie', 'data-ai-hint': 'robot child' },
  { id: 4, title: 'Killers of the Flower Moon', posterPath: 'https://placehold.co/500x750/1a1a1a/ffffff', type: 'movie', 'data-ai-hint': 'couple portrait' },
  { id: 5, title: 'Godzilla Minus One', posterPath: 'https://placehold.co/500x750/1a1a1a/ffffff', type: 'movie', 'data-ai-hint': 'monster city' },
  { id: 6, title: 'Civil War', posterPath: 'https://placehold.co/500x750/1a1a1a/ffffff', type: 'movie', 'data-ai-hint': 'statue liberty' },
  { id: 7, title: 'Poor Things', posterPath: 'https://placehold.co/500x750/1a1a1a/ffffff', type: 'movie', 'data-ai-hint': 'woman portrait' },
  { id: 8, title: 'Anatomy of a Fall', posterPath: 'https://placehold.co/500x750/1a1a1a/ffffff', type: 'movie', 'data-ai-hint': 'courtroom drama' },
];

export const mockTvShows: ContentItem[] = [
  { id: 101, title: 'Fallout', posterPath: 'https://placehold.co/500x750/4B0082/ffffff', type: 'tv', 'data-ai-hint': 'woman vault' },
  { id: 102, title: 'Shōgun', posterPath: 'https://placehold.co/500x750/4B0082/ffffff', type: 'tv', 'data-ai-hint': 'samurai warrior' },
  { id: 103, title: '3 Body Problem', posterPath: 'https://placehold.co/500x750/4B0082/ffffff', type: 'tv', 'data-ai-hint': 'virtual reality' },
  { id: 104, title: 'The Bear', posterPath: 'https://placehold.co/500x750/4B0082/ffffff', type: 'tv', 'data-ai-hint': 'chef kitchen' },
  { id: 105, title: 'Severance', posterPath: 'https://placehold.co/500x750/4B0082/ffffff', type: 'tv', 'data-ai-hint': 'man office' },
  { id: 106, title: 'Succession', posterPath: 'https://placehold.co/500x750/4B0082/ffffff', type: 'tv', 'data-ai-hint': 'family portrait' },
  { id: 107, title: 'Baby Reindeer', posterPath: 'https://placehold.co/500x750/4B0082/ffffff', type: 'tv', 'data-ai-hint': 'man stage' },
  { id: 108, title: 'Beef', posterPath: 'https://placehold.co/500x750/4B0082/ffffff', type: 'tv', 'data-ai-hint': 'man woman' },
];

export const mockTrending: ContentItem[] = [
    mockTvShows[0],
    mockMovies[0],
    mockTvShows[1],
    mockMovies[2],
    mockMovies[1],
    mockTvShows[2],
    mockMovies[5],
    mockTvShows[3],
]

export const mockAllContent: ContentItem[] = [...mockMovies, ...mockTvShows];

export const mockDetails: Record<string, ContentItem> = {
  '1': {
    ...mockMovies[0],
    overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    releaseDate: '2024-03-01',
    rating: 8.3,
    cast: [
      { id: 1, name: 'Timothée Chalamet', character: 'Paul Atreides', profilePath: 'https://placehold.co/200x300' },
      { id: 2, name: 'Zendaya', character: 'Chani', profilePath: 'https://placehold.co/200x300' },
      { id: 3, name: 'Rebecca Ferguson', character: 'Lady Jessica', profilePath: 'https://placehold.co/200x300' },
    ],
  },
  '101': {
    ...mockTvShows[0],
    overview: 'In a future, post-apocalyptic Los Angeles brought about by nuclear decimation, citizens must live in underground bunkers to protect themselves from radiation, mutants and bandits.',
    releaseDate: '2024-04-10',
    rating: 8.5,
    cast: [
      { id: 4, name: 'Ella Purnell', character: 'Lucy MacLean', profilePath: 'https://placehold.co/200x300' },
      { id: 5, name: 'Aaron Moten', character: 'Maximus', profilePath: 'https://placehold.co/200x300' },
      { id: 6, name: 'Walton Goggins', character: 'The Ghoul / Cooper Howard', profilePath: 'https://placehold.co/200x300' },
    ],
  },
};
