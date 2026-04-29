import Link from "next/link";
import Image from "next/image";
import { Play, TrendingUp, Music, Film } from "lucide-react";
import { fetchTrendingMovies } from "@/lib/api/tmdb";
import { fetchTrendingMusic } from "@/lib/api/music";

export const metadata = {
  title: "Trending Now | NexusMedia",
  description: "Check out the hottest movies and music trending across the globe.",
};

export default async function TrendingPage() {
  const moviesData = await fetchTrendingMovies().catch(() => ({ results: [] }));
  const musicData = await fetchTrendingMusic().catch(() => ({ items: [] }));

  const movies = (moviesData.results || []).slice(0, 10).map((m: any) => ({
    id: m.id,
    title: m.title,
    type: "Movie",
    img: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : "https://placehold.co/400x600/111827/3b82f6?text=No+Poster"
  }));

  const music = (musicData.items || []).slice(0, 10).map((m: any) => ({
    id: m.track.id,
    title: m.track.name,
    artist: m.track.artists?.[0]?.name || "Unknown Artist",
    type: "Music",
    img: m.track.album?.images?.[0]?.url || "https://placehold.co/400x400/111827/8b5cf6?text=No+Cover"
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-12 w-12 rounded-2xl bg-neonBlue/20 flex items-center justify-center text-neonBlue">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-4xl font-heading font-bold text-softWhite">Trending Now</h1>
          <p className="text-softGray">The most popular content across Movies and Music today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Trending Movies Column */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Film className="h-5 w-5 text-neonBlue" />
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Top Movies</h2>
          </div>
          <div className="space-y-4">
            {movies.map((item: any, idx: number) => (
              <Link key={item.id} href={`/movies/${item.id}`} className="flex items-center gap-4 p-3 bg-card border border-white/5 rounded-2xl hover:border-neonBlue/50 hover:bg-white/5 transition-all group">
                <span className="text-2xl font-black text-white/10 w-8 text-center">{idx + 1}</span>
                <div className="relative h-20 w-14 rounded-lg overflow-hidden shrink-0">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-softWhite font-bold truncate group-hover:text-neonBlue transition-colors">{item.title}</h3>
                  <p className="text-xs text-softGray mt-1">Global Trending</p>
                </div>
                <Play className="h-5 w-5 text-softGray group-hover:text-neonBlue opacity-0 group-hover:opacity-100 transition-all mr-2" />
              </Link>
            ))}
          </div>
        </div>

        {/* Trending Music Column */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Music className="h-5 w-5 text-neonPurple" />
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Top Music</h2>
          </div>
          <div className="space-y-4">
            {music.map((item: any, idx: number) => (
              <Link key={item.id} href={`/music/${item.id}`} className="flex items-center gap-4 p-3 bg-card border border-white/5 rounded-2xl hover:border-neonPurple/50 hover:bg-white/5 transition-all group">
                <span className="text-2xl font-black text-white/10 w-8 text-center">{idx + 1}</span>
                <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-softWhite font-bold truncate group-hover:text-neonPurple transition-colors">{item.title}</h3>
                  <p className="text-xs text-softGray mt-1">{item.artist}</p>
                </div>
                <Play className="h-5 w-5 text-softGray group-hover:text-neonPurple opacity-0 group-hover:opacity-100 transition-all mr-2" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
