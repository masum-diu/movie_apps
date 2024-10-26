"use client";
import React, { useEffect, useState } from "react";
import { getWatchlist, removeFromWatchlist } from "@/lib/watchlist"; // Adjust path to your lib
import Link from "next/link";
import Image from "next/image";
import { fetchMovieDetails } from "@/lib/api"; // Make sure this path points to the movie fetch function

interface Movie {
  id: string;
  poster_path: string;
  title: string;
}

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const list = await getWatchlist();
      setWatchlist(list);

      const movieDetails = await Promise.all(
        list.map(async (movieId) => {
          const movie = await fetchMovieDetails(movieId);
          return {
            id: movie.id,
            poster_path: movie.poster_path,
            title: movie.title,
          };
        })
      );
      setMovies(movieDetails);
    };

    fetchWatchlist();
  }, []);

  const handleRemove = async (movieId: string) => {
    await removeFromWatchlist(movieId);
    setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  return (
    <div className="py-5">
      <h1 className="text-3xl font-bold mb-4">My Watchlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="border rounded-lg">
              <Link href={`/movies/${movie.id}`}>
                <div className="rounded-t-lg overflow-hidden shadow-lg">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={450}
                  />
                </div>
              </Link>
              <button
                onClick={() => handleRemove(movie.id)}
                className=" text-red-500 py-2 text-center w-full "
              >
                Remove from Watchlist
              </button>
            </div>
          ))
        ) : (
          <p>No movies in your watchlist.</p>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
