import MovieList from "@/components/MovieList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movie App",
  description: "This is a Movie database",
};

export default function HomePage() {
  return <MovieList />;
}
