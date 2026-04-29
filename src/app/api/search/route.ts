import { NextResponse } from "next/server";
import { searchMovies } from "@/lib/api/tmdb";
import { searchMusic } from "@/lib/api/music";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const [moviesRes, musicRes] = await Promise.all([
      searchMovies(query).catch(() => ({ results: [] })),
      searchMusic(query).catch(() => ({ tracks: { items: [] } }))
    ]);

    const formattedMovies = (moviesRes?.results || []).slice(0, 10).map((movie: any) => ({
      id: movie.id.toString(),
      type: "Movie",
      title: movie.title,
      subtitle: movie.release_date?.split("-")[0] || "Unknown",
      image: movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
        : "https://placehold.co/400x600/111827/3b82f6?text=No+Poster",
      popularity: movie.popularity || 0
    }));

    const formattedMusic = (musicRes?.tracks?.items || []).map((track: any) => ({
      id: track.id,
      type: "Music",
      title: track.name,
      subtitle: track.artists?.[0]?.name || "Unknown",
      image: track.album?.images?.[0]?.url || "https://placehold.co/400x400/111827/8b5cf6?text=No+Cover",
      popularity: track.popularity || 0
    }));

    // Interleave/sort results by popularity to mix movies and music nicely
    const unifiedResults = [...formattedMovies, ...formattedMusic].sort((a, b) => b.popularity - a.popularity);

    return NextResponse.json({ results: unifiedResults });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
