// /app/search/page.js

"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import MovieList from "@/components/MovieList";
import { Suspense } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  return (
    <Suspense fallback={<p>Loading search results...</p>}>
      <div>
        {query ? (
          <>
            <h1 className="text-2xl font-semibold py-4">
              Search Results for: {query}
            </h1>
            <Suspense fallback={<p>Loading movies...</p>}>
              <MovieList query={query} />
            </Suspense>
          </>
        ) : (
          <p className="text-lg">Please enter a search query.</p>
        )}
      </div>
    </Suspense>
  );
};

export default Search;
