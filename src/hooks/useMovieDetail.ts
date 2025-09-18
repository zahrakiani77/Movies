import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/lib";
import type { AxiosResponse } from "axios";

export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieDetailsApi {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  original_language: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  genres: MovieGenre[];
  homepage?: string;
  status?: string;
  production_companies?: { name: string }[];
  spoken_languages?: { name: string }[];
  budget?: number;
  revenue?: number;
  tagline?: string;
  production_countries?: { name: string }[];
}

export interface MovieTrailer {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

interface VideosApi {
  results: MovieTrailer[];
}

export function useMovieDetail(id?: string) {
  const [movie, setMovie] = useState<MovieDetailsApi | null>(null);
  const [trailer, setTrailer] = useState<MovieTrailer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    Promise.all([
      axiosInstance.get(`/movie/${id}`),
      axiosInstance.get(`/movie/${id}/videos`),
    ])
      .then(([movieRes, videosRes]: [AxiosResponse<MovieDetailsApi>, AxiosResponse<VideosApi>]) => {
        setMovie(movieRes.data);
        const trailers = videosRes.data.results.filter(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        );
        setTrailer(trailers[0] || null);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err?.response?.data?.status_message ||
            err?.message ||
            "Failed to load movie details."
        );
        setLoading(false);
      });
  }, [id]);

  return { movie, trailer, loading, error };
}
