export type ContentType = 'movie' | 'tv';

export interface ContentItem {
  id: number;
  title: string;
  posterPath: string;
  backdropPath?: string;
  type: ContentType;
  overview?: string;
  releaseDate?: string;
  rating?: number;
  cast?: CastMember[];
  'data-ai-hint'?: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profilePath: string;
}
