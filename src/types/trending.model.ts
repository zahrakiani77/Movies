export type TrendingMovie = {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title?: string;
  name?: string; // برای media_type هایی که اسمشون name هست (tv)
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  first_air_date?: string; // tv
  video?: boolean;
  vote_average: number;
  vote_count: number;
};

export type TrendingModel = {
  page: number;
  results: TrendingMovie[];
  total_pages: number;
  total_results: number;
};
