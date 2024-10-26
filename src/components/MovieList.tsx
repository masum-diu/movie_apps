"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import MovieCard from "@/components/MovieCard";
import { fetchPopularMovies, fetchSearchMovies } from "@/lib/api";
import Link from "next/link";

interface MovieListProps {
  query?: string;
}

const MovieList: React.FC<MovieListProps> = ({ query }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: query ? ["searchMovies", query] : ["popularMovies"],
      queryFn: ({ pageParam = 1 }) =>
        query
          ? fetchSearchMovies(query, pageParam)
          : fetchPopularMovies(pageParam),
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
      initialPageParam: 1,
    });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
      {data?.pages.map((page) =>
        page.results.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`} passHref>
            <MovieCard
              key={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              releaseDate={movie.release_date}
              overview={movie.overview}
            />
          </Link>
        ))
      )}
      {hasNextPage && (
        <button
          className="col-span-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default MovieList;
