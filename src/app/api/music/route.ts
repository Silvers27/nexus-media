import { NextResponse } from "next/server";
import { fetchTrendingMusic, searchMusicByGenre } from "@/lib/api/music";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const genre = searchParams.get("genre");

  try {
    if (genre && genre !== "All") {
      const data = await searchMusicByGenre(genre, offset);
      // Normalize search results to match playlist item structure: { items: [ { track: ... } ] }
      const normalized = {
        items: (data.tracks?.items || []).map((track: any) => ({ track }))
      };
      return NextResponse.json(normalized);
    } else {
      const data = await fetchTrendingMusic(offset);
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error("Music API Error:", error);
    return NextResponse.json({ error: "Failed to fetch music" }, { status: 500 });
  }
}
