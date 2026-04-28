import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import HeroSearch from "@/components/home/HeroSearch";
import QuickTools from "@/components/home/QuickTools";
import { fetchTrendingMovies } from "@/lib/api/tmdb";
import { fetchTrendingMusic } from "@/lib/api/spotify";

export default async function Home() {
  const moviesData = await fetchTrendingMovies().catch(() => ({ results: [] }));
  const musicData = await fetchTrendingMusic().catch(() => ({ items: [] }));

  let trendingMovies = (moviesData.results || []).slice(0, 6).map((m: any) => ({
    id: m.id,
    title: m.title,
    type: "Movie",
    img: m.poster_path 
      ? `https://image.tmdb.org/t/p/w500${m.poster_path}` 
      : "https://placehold.co/400x600/111827/3b82f6?text=No+Poster"
  }));

  let trendingMusic = (musicData.items || []).slice(0, 6).map((m: any) => ({
    id: m.track.id,
    title: m.track.name,
    type: "Music",
    img: m.track.album?.images?.[0]?.url || "https://placehold.co/400x400/111827/8b5cf6?text=No+Cover"
  }));

  // Demo Fallbacks for first-time launch
  if (trendingMovies.length === 0) {
    trendingMovies = [
      { id: "1", title: "Inception", type: "Movie", img: "https://placehold.co/400x600/111827/3b82f6?text=Inception" },
      { id: "2", title: "Interstellar", type: "Movie", img: "https://placehold.co/400x600/111827/3b82f6?text=Interstellar" },
      { id: "3", title: "The Dark Knight", type: "Movie", img: "https://placehold.co/400x600/111827/3b82f6?text=The+Dark+Knight" },
    ];
  }

  if (trendingMusic.length === 0) {
    trendingMusic = [
      { id: "1", title: "Blinding Lights", type: "Music", img: "https://placehold.co/400x400/111827/8b5cf6?text=The+Weeknd" },
      { id: "2", title: "Levitating", type: "Music", img: "https://placehold.co/400x400/111827/8b5cf6?text=Dua+Lipa" },
      { id: "3", title: "Save Your Tears", type: "Music", img: "https://placehold.co/400x400/111827/8b5cf6?text=The+Weeknd" },
    ];
  }

  const categories = ["Afrohouse", "Amapiano", "Deep House", "Action", "Drama", "Sci-Fi", "Hip Hop", "Comedy"];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neonBlue/20 via-space to-space -z-10"></div>
        <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
          Find Any <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">Song</span> or <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPurple to-pink-500">Movie</span> Instantly
        </h1>
        <p className="text-lg md:text-xl text-softGray mb-12 max-w-2xl mx-auto">
          Stream or download from official sources. The ultimate hub for all your entertainment needs.
        </p>

        <HeroSearch />
        <QuickTools />
      </section>

      {/* 3a. Trending Movies Section */}
      <section className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-[100vw] overflow-hidden">
        <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-heading font-bold text-softWhite">Trending Movies 🎬</h2>
          <Link href="/movies" className="text-sm font-medium text-neonBlue hover:text-blue-400">View All</Link>
        </div>
        
        <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar px-4 sm:px-6 lg:px-8 -mx-4 sm:-mx-6 lg:-mx-8 snap-x">
          <div className="w-[calc((100vw-80rem)/2)] shrink-0 hidden lg:block"></div>
          {trendingMovies.map((item: any) => (
            <div key={item.id} className="snap-start shrink-0 w-64 group relative rounded-2xl overflow-hidden bg-card border border-white/5 hover:border-neonBlue/50 transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)]">
              <Link href={`/movies/${item.id}`} className="block relative aspect-[2/3] w-full">
                <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-space via-space/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-neonBlue/90 flex items-center justify-center text-white backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.5)] cursor-pointer hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 ml-1" fill="currentColor" />
                  </div>
                </div>
              </Link>
              <div className="absolute bottom-0 inset-x-0 p-5 pointer-events-none">
                <span className="text-xs font-semibold text-neonBlue mb-1 block tracking-wider uppercase">{item.type}</span>
                <h3 className="text-lg font-bold text-white truncate">{item.title}</h3>
              </div>
            </div>
          ))}
          <div className="w-[calc((100vw-80rem)/2)] shrink-0 hidden lg:block"></div>
        </div>
      </section>

      {/* 3b. Trending Music Section */}
      <section className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-[100vw] overflow-hidden">
        <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-heading font-bold text-softWhite">Trending Music 🎵</h2>
          <Link href="/music" className="text-sm font-medium text-neonPurple hover:text-purple-400">View All</Link>
        </div>
        
        <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar px-4 sm:px-6 lg:px-8 -mx-4 sm:-mx-6 lg:-mx-8 snap-x">
          <div className="w-[calc((100vw-80rem)/2)] shrink-0 hidden lg:block"></div>
          {trendingMusic.map((item: any) => (
            <div key={item.id} className="snap-start shrink-0 w-64 group relative rounded-2xl overflow-hidden bg-card border border-white/5 hover:border-neonPurple/50 transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)]">
              <Link href={`/music/${item.id}`} className="block relative aspect-square w-full">
                <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-space via-space/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-neonPurple/90 flex items-center justify-center text-white backdrop-blur-sm shadow-[0_0_20px_rgba(139,92,246,0.5)] cursor-pointer hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 ml-1" fill="currentColor" />
                  </div>
                </div>
              </Link>
              <div className="absolute bottom-0 inset-x-0 p-5 pointer-events-none">
                <span className="text-xs font-semibold text-neonPurple mb-1 block tracking-wider uppercase">{item.type}</span>
                <h3 className="text-lg font-bold text-white truncate">{item.title}</h3>
              </div>
            </div>
          ))}
          <div className="w-[calc((100vw-80rem)/2)] shrink-0 hidden lg:block"></div>
        </div>
      </section>

      {/* 4. Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-softWhite mb-8">Explore by Category</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((cat, idx) => (
              <Link 
                key={idx} 
                href={`/search?q=${cat}`}
                className="px-6 py-3 rounded-full bg-card border border-white/10 hover:border-neonPurple hover:bg-white/5 text-softWhite font-medium transition-all"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
