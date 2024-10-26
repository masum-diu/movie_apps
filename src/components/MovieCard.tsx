import Image from "next/image";
import React from "react";

interface MovieCardProps {
  title: string;
  posterPath: string;
  releaseDate: string;
  overview: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  posterPath,
  releaseDate,
  overview,
}) => {
  return (
    <div className=" bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <Image
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        width={500}
        height={750}
        className="w-full h-72 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">Release Date: {releaseDate}</p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
