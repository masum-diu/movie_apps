"use client";

import { useSearchParams } from "next/navigation";
import MovieList from "@/components/MovieList";

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  return (
    <div>
      {query ? (
        <>
          <h1 className="text-2xl font-semibold py-4">
            Search Results for: {query}
          </h1>
          <MovieList query={query} />
        </>
      ) : (
        <p className="text-lg">Please enter a search query.</p>
      )}
    </div>
  );
};

export default Search;
