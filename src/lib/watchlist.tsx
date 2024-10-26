const WATCHLIST_KEY = "watchlist";

export const getWatchlist = (): string[] => {
  const watchlist = localStorage.getItem(WATCHLIST_KEY);
  return watchlist ? JSON.parse(watchlist) : [];
};

export const isMovieInWatchlist = (movieId: string): boolean => {
  const watchlist = getWatchlist();
  return watchlist.includes(movieId);
};

export const addToWatchlist = (movieId: string): void => {
  const watchlist = getWatchlist();
  if (!watchlist.includes(movieId)) {
    localStorage.setItem(
      WATCHLIST_KEY,
      JSON.stringify([...watchlist, movieId])
    );
  }
};

export const removeFromWatchlist = (movieId: string): void => {
  localStorage.removeItem(WATCHLIST_KEY);
};
