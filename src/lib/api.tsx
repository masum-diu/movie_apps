import axiosInstance from "./axios";
// Import your response types if available
import { Movie, MovieResponse } from "@/app/types";

// Example function to fetch popular movies
export const fetchPopularMovies = async (
  page: number = 1
): Promise<MovieResponse> => {
  const response = await axiosInstance.get(`/movie/popular`, {
    params: { page },
  });
  return response.data;
};

// Example function to fetch movie details by ID
export const fetchMovieDetails = async (id: string): Promise<Movie> => {
  const response = await axiosInstance.get(`/movie/${id}`);
  return response.data;
};
export const fetchMovieDetailCredits = async (id: string): Promise<Movie> => {
  const response = await axiosInstance.get(`/movie/${id}/credits`);
  return response.data;
};
export const fetchRecommendations = async (id: string): Promise<Movie> => {
  const response = await axiosInstance.get(`/movie/${id}/recommendations`);
  return response.data;
};
export const fetchSearchMovies = async (
  query: string,
  page: number = 1
): Promise<MovieResponse> => {
  const response = await axiosInstance.get(`/search/movie`, {
    params: { query, page },
  });
  return response.data;
};
