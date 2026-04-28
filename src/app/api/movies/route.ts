import { NextResponse } from "next/server";
import { fetchTrendingMovies, discoverMovies } from "@/lib/api/tmdb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const genre = searchParams.get("genre");
  const year = searchParams.get("year");

  try {
    let data;
    if (genre || year) {
      data = await discoverMovies(genre || undefined, year || undefined, page);
    } else {
      data = await fetchTrendingMovies(page);
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Movies API Error:", error);
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}
