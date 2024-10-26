// src/lib/watchlist.ts
let watchlist: string[] = []; // Mock in-memory storage

export const addToWatchlist = async (movieId: string) => {
  if (!watchlist.includes(movieId)) {
    watchlist.push(movieId);
  }
};

export const removeFromWatchlist = async (movieId: string) => {
  watchlist = watchlist.filter((id) => id !== movieId);
};

export const getWatchlist = async () => {
  return watchlist;
};
