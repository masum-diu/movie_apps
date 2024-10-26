export interface Movie {
  results: any;
  tagline: any;
  backdrop_path: any;
  genres: any;
  cast: any;
  overview: string;
  release_date: string;
  id: number;
  title: string;
  poster_path: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

export interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  genres: { id: number; name: string }[];
  runtime: number;
  vote_average: number;
}
