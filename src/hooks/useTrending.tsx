import type { TrendingModel } from "../types/trending.model";
import { axiosInstance } from "../utils/lib";
import { useQuery } from "@tanstack/react-query";

export const useTrending = () => {
  return useQuery<TrendingModel>({
    queryKey: ["trending", "day"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/trending/all/day",
        {
          params: {
            language: "en-US",
          },
        }
      );

      return response.data;
    },
    staleTime: 1000 * 60 * 10,
  });
};

