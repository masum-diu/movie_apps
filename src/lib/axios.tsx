import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3", // Replace with your API base URL
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, // Automatically include API key in requests
  },
});

export default axiosInstance;
