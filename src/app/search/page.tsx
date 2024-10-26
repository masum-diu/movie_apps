"use client";
import { useSearchParams } from "next/navigation";
import MovieList from "@/components/MovieList";
import { Suspense } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
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
      </Suspense>
    </div>
  );
};

export default Search;
