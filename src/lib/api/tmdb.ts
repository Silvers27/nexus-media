import { getCachedData } from "./cache";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchTrendingMovies(page: number = 1) {
  if (!TMDB_API_KEY) {
    console.warn("TMDb API key is missing. Returning empty array.");
    return [];
  }
  
  return getCachedData(`tmdb_trending_movies_page_${page}`, async () => {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}&page=${page}`);
    if (!res.ok) throw new Error("Failed to fetch trending movies");
    return res.json();
  }, 86400); // 24 hours
}

export async function fetchMovieDetails(id: string) {
  if (!TMDB_API_KEY) return null;
  
  return getCachedData(`tmdb_movie_${id}`, async () => {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`);
    if (!res.ok) throw new Error("Failed to fetch movie details");
    return res.json();
  }, 604800); // 7 days
}

export async function searchMovies(query: string) {
  if (!TMDB_API_KEY) return [];
  // Search queries generally aren't cached as aggressively, but we can cache for 1 hour
  return getCachedData(`tmdb_search_${query.toLowerCase()}`, async () => {
    const res = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${TMDB_API_KEY}`);
    if (!res.ok) throw new Error("Failed to search movies");
    return res.json();
  }, 3600); // 1 hour
}

export async function discoverMovies(genreId?: string, year?: string, page: number = 1) {
  if (!TMDB_API_KEY) return { results: [] };
  
  let url = `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&page=${page}&sort_by=popularity.desc`;
  if (genreId && genreId !== "All") url += `&with_genres=${genreId}`;
  if (year && year !== "All Years") url += `&primary_release_year=${year}`;

  return getCachedData(`tmdb_discover_${genreId}_${year}_${page}`, async () => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to discover movies");
    return res.json();
  }, 86400); // 24 hours
}
