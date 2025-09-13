import type { Genre } from "@/types/popular.model";
import { axiosInstance } from "../utils/lib";
import { useQuery } from "@tanstack/react-query";

export const useGenres = () => {
  return useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: async () => {
      const res = await axiosInstance.get("/genre/movie/list?language=en");
      return res.data.genres;
    },
    staleTime: 1000 * 60 * 60, 
  });
};
