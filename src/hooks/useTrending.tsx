import type { TrendingModel } from "../types/trending.model";
import { axiosInstance } from "../utils/lib"
import { useEffect, useState } from "react";

export const useTrending = () => {
    const [data, setData] = useState<TrendingModel | null>(null);
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    useEffect(() => {
        setisLoading(true);
        axiosInstance
          .get(`/trending/all/day?language=en-US`)
          .then((res) => {
            setData(res.data);
            setisLoading(false);
          })
          .catch((err) => {
            setError(String(err));
            setisLoading(false);
          });
    }, []);
    return { data, isLoading, error };
}

