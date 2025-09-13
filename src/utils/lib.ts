import axios from "axios";

const theMoviesToken = import.meta.env.VITE_ACCESS_TOCKEN;

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${theMoviesToken}`,
  },
});
