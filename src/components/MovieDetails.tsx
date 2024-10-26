"use client";
import React, { useState, useEffect, useTransition } from "react";
import { Movie } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { FaBookmark } from "react-icons/fa";
import {
  addToWatchlist,
  removeFromWatchlist,
  isMovieInWatchlist,
} from "@/lib/watchlist"; // Import your watchlist functions

interface MovieDetailsProps {
  movie: Movie;
  credits: any[];
  recommendation: any[];
}

const MovieDetails: React.FC<MovieDetailsProps> = ({
  movie,
  credits,
  recommendation,
}) => {
  const [isPending, startTransition] = useTransition();
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    // Check if the movie is already in the watchlist when the component mounts
    const checkWatchlist = async () => {
      const exists = await isMovieInWatchlist(movie.id);
      setIsInWatchlist(exists);
    };

    checkWatchlist();
  }, [movie.id]);

  const handleToggleWatchlist = async () => {
    startTransition(async () => {
      if (!isInWatchlist) {
        await addToWatchlist(movie.id);
        setIsInWatchlist(true);
      } else {
        await removeFromWatchlist(movie.id);
        setIsInWatchlist(false);
      }
    });
  };

  return (
    <div>
      <div
        className="relative bg-cover bg-center mt-4 grid grid-cols-12 gap-4 rounded-lg"
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-blue-950 opacity-70 rounded-lg"></div>
        <div className="col-span-12 md:col-span-3 flex justify-center mb-4 md:mb-0 relative z-10 p-5">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              width={300}
              height={450}
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-9 relative z-10 text-white p-5">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-between">
            {movie.title}
            <button
              onClick={handleToggleWatchlist}
              disabled={isPending}
              className="flex items-center text-xl cursor-pointer hover:text-amber-500"
            >
              <FaBookmark
                style={{ color: isInWatchlist ? "rgb(192 165 19)" : "white" }}
              />
            </button>
          </h1>
          <p className="text-2xl capitalize mb-2">Overview</p>
          <p className="text-lg mb-4">{movie.overview}</p>
          <div className="flex flex-wrap mb-2">
            {movie.genres.map((genre: any) => (
              <span
                key={genre.id}
                className="mr-2 px-2 py-2 rounded-2xl bg-gray-800 text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-300 mb-2">
            Release Date: {movie.release_date}
          </p>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mt-6 mb-2">Top Billed Cast</h2>
        <div className="flex overflow-x-auto space-x-4">
          {credits?.map((actor: any) => (
            <div
              key={actor.id}
              className="flex-shrink-0 w-24 text-center bg-white rounded-lg shadow-lg mb-2"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w200/${actor?.profile_path}`}
                alt={actor?.name}
                width={100}
                height={150}
                className="rounded-t-lg"
              />
              <p className="text-sm mt-2 text-black">{actor.original_name}</p>
              <p className="text-xs text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <h2 className="text-xl font-semibold mt-6 mb-2">Recommendations</h2>
        <div className="flex overflow-x-auto space-x-4">
          {recommendation?.map((movie: any) => (
            <div
              key={movie.id}
              className="flex-shrink-0 w-24 text-center bg-white rounded-lg shadow-lg mb-2 transform transition duration-300 hover:scale-105 overflow-hidden"
            >
              <Link href={`/movies/${movie.id}`} passHref>
                <Image
                  src={`https://image.tmdb.org/t/p/w200/${movie?.poster_path}`}
                  alt={movie?.title}
                  width={100}
                  height={150}
                  className="rounded-lg"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
