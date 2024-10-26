"use client";
import React, { useEffect, useState } from "react";
import { getWatchlist, removeFromWatchlist } from "@/lib/watchlist"; // Adjust path to your lib
import Link from "next/link";
import Image from "next/image";
import { fetchMovieDetails } from "@/lib/api"; // Make sure this path points to the movie fetch function

interface Movie {
  id: string; // Ensure this is a string to match your watchlist IDs
  poster_path: string;
  title: string;
}

const WatchlistPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Function to fetch watchlist from local storage and movie details
    const fetchWatchlist = () => {
      const list = getWatchlist(); // Get watchlist from local storage
      const movieDetails = Promise.all(
        list.map(async (movieId) => {
          const movie = await fetchMovieDetails(movieId);
          return {
            id: movie.id.toString(), // Ensure ID is a string
            poster_path: movie.poster_path,
            title: movie.title,
          };
        })
      );
      movieDetails.then(setMovies); // Set the movies state after fetching details
    };

    fetchWatchlist(); // Fetch watchlist on component mount
  }, []);

  const handleRemove = async (movieId: string) => {
    removeFromWatchlist(movieId); // Remove from watchlist
    setMovies((prev) => prev.filter((movie) => movie.id !== movieId)); // Update state to remove the movie immediately
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
                className="text-red-500 py-2 text-center w-full"
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
