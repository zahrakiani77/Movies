// import type { PopulargModel } from "@/types/popular.model";
// import { axiosInstance } from "../utils/lib"
// import { useEffect, useState } from "react";

// export const usePopularMovies=()=>{
//     const [data,setData]=useState<PopulargModel>();
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string>('');

//     useEffect(()=>{
//         setIsLoading(true)
//         axiosInstance
//           .get(`/movie/popular?language=en-US&page=1`)
//           .then((res) => {
//             setData(res.data);
//             setIsLoading(false);
//             console.log(res.data);
//           })
//           .catch((err) => {
//             setError(String(err));
//             setIsLoading(false);
//           });
// }, []);

// return{data,error,isLoading};
// }

import type { PopulargModel } from "@/types/popular.model";
import { axiosInstance } from "../utils/lib";
import { useQuery } from "@tanstack/react-query";

export const usePopularMovies = (page: number) => {
  return useQuery<PopulargModel>({
    queryKey: ["popular-movies", page],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/movie/popular?language=en-US&page=${page}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });
};
