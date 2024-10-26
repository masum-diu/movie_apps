// src/app/movies/[id]/page.tsx
import MovieDetails from "@/components/MovieDetails";
import {
  fetchMovieDetails,
  fetchMovieDetailCredits,
  fetchRecommendations,
} from "@/lib/api";
import { Movie } from "@/app/types";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const movie: Movie = await fetchMovieDetails(id);
    const creditsResponse = await fetchMovieDetailCredits(id);
    const recommendationResponse = await fetchRecommendations(id);

    const credits = creditsResponse?.cast.slice(0, 15) || [];
    const recommendation = recommendationResponse?.results.slice(0, 15) || [];

    return (
      <MovieDetails
        movie={movie}
        credits={credits}
        recommendation={recommendation}
      />
    );
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return <div>Error fetching movie details.</div>;
  }
}
