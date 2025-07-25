
'use server';

import type { ContentItem, ContentType } from './types';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

interface TmdbMovie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
}

interface TmdbTvShow {
  id: number;
  name: string;
  poster_path: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  backdrop_path: string;
}

interface TmdbCastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string;
}

const toContentItem = (item: TmdbMovie | TmdbTvShow, type: ContentType): ContentItem => {
    const isMovie = type === 'movie';
    const title = isMovie ? (item as TmdbMovie).title : (item as TmdbTvShow).name;
    const releaseDate = isMovie ? (item as TmdbMovie).release_date : (item as TmdbTvShow).first_air_date;
  
    return {
      id: item.id,
      title: title,
      posterPath: item.poster_path ? `${IMAGE_BASE_URL}/w500${item.poster_path}` : 'https://placehold.co/500x750',
      backdropPath: item.backdrop_path ? `${IMAGE_BASE_URL}/w1280${item.backdrop_path}` : 'https://placehold.co/1280x720',
      type: type,
      overview: item.overview,
      releaseDate: releaseDate,
      rating: item.vote_average,
    };
  };

async function fetchFromTmdb(endpoint: string) {
  // Add a small delay to simulate network latency for loading bar
  await new Promise(resolve => setTimeout(resolve, 500));
  const url = `${BASE_URL}/${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    if (!response.ok) {
      console.error(`Error fetching ${url}: ${response.statusText}`);
      return null;
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch from TMDB endpoint ${endpoint}:`, error);
    return null;
  }
}

export async function getPopularMovies(): Promise<ContentItem[]> {
  const data = await fetchFromTmdb('movie/popular');
  return data ? data.results.map((item: TmdbMovie) => toContentItem(item, 'movie')) : [];
}

export async function getTopRatedTvShows(): Promise<ContentItem[]> {
  const data = await fetchFromTmdb('tv/top_rated');
  return data ? data.results.map((item: TmdbTvShow) => toContentItem(item, 'tv')) : [];
}

export async function getTrending(): Promise<ContentItem[]> {
    const data = await fetchFromTmdb('trending/all/day');
    if (!data) return [];
    
    return data.results
        .map((item: any) => {
            if (item.media_type === 'movie' || item.media_type === 'tv') {
                return toContentItem(item, item.media_type);
            }
            return null;
        })
        .filter((item: ContentItem | null): item is ContentItem => item !== null);
}

export async function getContentDetails(id: string, type: ContentType): Promise<ContentItem | null> {
    const detailsData = await fetchFromTmdb(`${type}/${id}`);
    const creditsData = await fetchFromTmdb(`${type}/${id}/credits`);

    if (!detailsData) return null;

    const contentItem = toContentItem(detailsData, type);
    
    if (creditsData && creditsData.cast) {
        contentItem.cast = creditsData.cast.slice(0, 10).map((member: TmdbCastMember) => ({
            id: member.id,
            name: member.name,
            character: member.character,
            profilePath: member.profile_path ? `${IMAGE_BASE_URL}/w200${member.profile_path}` : 'https://placehold.co/200x300',
        }));
    }

    return contentItem;
}

export async function searchContent(query: string): Promise<ContentItem[]> {
  const data = await fetchFromTmdb(`search/multi?query=${encodeURIComponent(query)}`);
  if (!data) return [];

  return data.results
    .map((item: any) => {
        if (item.media_type === 'movie' || item.media_type === 'tv') {
            return toContentItem(item, item.media_type);
        }
        return null;
    })
    .filter((item: ContentItem | null): item is ContentItem => item !== null && !!item.posterPath && !item.posterPath.endsWith('null'));
}
