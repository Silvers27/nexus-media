"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, ExternalLink, Star } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function MoviesContent() {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre") || "";
  const year = searchParams.get("year") || "";

  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Reset when filters change
  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [genre, year]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let url = `/api/movies?page=${page}`;
        if (genre) url += `&genre=${genre}`;
        if (year) url += `&year=${year}`;

        const res = await fetch(url);
        const data = await res.json();
        
        if (data.results) {
          const formatted = data.results.map((m: any) => ({
            id: m.id.toString(),
            title: m.title,
            year: m.release_date?.split("-")[0] || "Unknown",
            rating: m.vote_average?.toFixed(1) || "N/A",
            image: m.poster_path 
              ? `https://image.tmdb.org/t/p/w500${m.poster_path}` 
              : "https://placehold.co/400x600/111827/3b82f6?text=No+Poster"
          }));
          
          setMovies(prev => page === 1 ? formatted : [...prev, ...formatted]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, genre, year]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar */}
        <Sidebar type="movies" />

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-heading font-bold text-softWhite mb-2">Discover Movies</h1>
              <p className="text-softGray">Search for movies and find official legal streaming options.</p>
            </div>
            
            {/* Top Bar Sort (Visual only) */}
            <div className="flex gap-2 p-1 bg-card border border-white/5 rounded-lg">
              {['Trending', 'Top Rated', 'Upcoming'].map((sort, idx) => (
                <button 
                  key={sort} 
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${idx === 0 ? 'bg-white/10 text-softWhite shadow-sm' : 'text-softGray hover:text-softWhite hover:bg-white/5'}`}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>

          {movies.length === 0 && !loading ? (
            <div className="text-center py-20">
              <p className="text-softGray text-lg">No movies found matching these filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((item, index) => (
                <div key={`${item.id}-${index}`} className="group relative rounded-xl overflow-hidden bg-card border border-white/5 hover:border-neonBlue/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-white">{item.rating}</span>
                  </div>

                  <Link href={`/movies/${item.id}`} className="block relative aspect-[2/3]">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-space/90 via-space/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      <button className="w-14 h-14 rounded-full bg-neonBlue flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 ml-1" fill="currentColor" />
                      </button>
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <Link href={`/movies/${item.id}`} className="block">
                      <h3 className="text-softWhite font-bold truncate hover:text-neonBlue transition-colors">{item.title}</h3>
                      <p className="text-sm text-softGray mt-1">{item.year}</p>
                    </Link>
                    <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-2">
                      <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-neonBlue text-softWhite hover:text-white text-xs font-semibold transition-colors">
                        <Play className="w-3.5 h-3.5" /> Watch
                      </button>
                      <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-softWhite text-xs font-semibold transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" /> Sources
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-12 flex justify-center">
             <button 
               onClick={() => setPage(p => p + 1)}
               disabled={loading}
               className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
             >
               {loading ? "Loading..." : "Load More"}
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function MoviesPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading Movies...</div>}>
      <MoviesContent />
    </Suspense>
  );
}
