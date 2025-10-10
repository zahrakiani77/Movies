
import type { PopularMoviesResponse } from "@/types/popular.model";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/lib";

export const useSearch = (keyword: string, page: number) => {
    const trimmed = keyword.trim();

    return useQuery<PopularMoviesResponse>({
        queryKey: ["search-movies", trimmed, page],
        queryFn: async () => {
            const response = await axiosInstance.get("/search/movie", {
                params: {
                    query: trimmed,
                    page,
                    include_adult: false,
                    language: "en-US",
                },
            });
            return response.data;
        },
        enabled: trimmed.length > 0,
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5,
    });
};