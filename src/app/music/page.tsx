"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Download, MoreHorizontal } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import MiniPlayer from "@/components/ui/MiniPlayer";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function MusicContent() {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre") || "";

  const [music, setMusic] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  // Reset when filter changes
  useEffect(() => {
    setMusic([]);
    setOffset(0);
  }, [genre]);

  useEffect(() => {
    const fetchMusic = async () => {
      setLoading(true);
      try {
        let url = `/api/music?offset=${offset}`;
        if (genre) url += `&genre=${genre}`;

        const res = await fetch(url);
        const data = await res.json();
        
        if (data.items) {
          const formatted = data.items.map((m: any) => ({
            id: m.track.id,
            title: m.track.name,
            artist: m.track.artists?.[0]?.name || "Unknown",
            image: m.track.album?.images?.[0]?.url || "https://placehold.co/400x400/111827/8b5cf6?text=No+Cover"
          }));
          
          setMusic(prev => offset === 0 ? formatted : [...prev, ...formatted]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, [offset, genre]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar */}
        <Sidebar type="music" />

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-heading font-bold text-softWhite mb-2">Discover Music</h1>
              <p className="text-softGray">Find the latest tracks and albums from official sources.</p>
            </div>
            
            {/* Top Bar Sort (Visual only) */}
            <div className="flex gap-2 p-1 bg-card border border-white/5 rounded-lg">
              {['Trending', 'New', 'Popular'].map((sort, idx) => (
                <button 
                  key={sort} 
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${idx === 0 ? 'bg-white/10 text-softWhite shadow-sm' : 'text-softGray hover:text-softWhite hover:bg-white/5'}`}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>

          {music.length === 0 && !loading ? (
            <div className="text-center py-20">
              <p className="text-softGray text-lg">No music found matching this genre.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {music.map((item, index) => (
                <div key={`${item.id}-${index}`} className="group relative rounded-xl overflow-hidden bg-card border border-white/5 hover:border-neonPurple/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-300">
                  <Link href={`/music/${item.id}`} className="block relative aspect-square">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-space/90 via-space/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                      <button className="w-14 h-14 rounded-full bg-neonPurple flex items-center justify-center text-white shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 ml-1" fill="currentColor" />
                      </button>
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <Link href={`/music/${item.id}`} className="block">
                      <h3 className="text-softWhite font-semibold truncate hover:text-neonPurple transition-colors">{item.title}</h3>
                      <p className="text-sm text-softGray truncate mt-0.5">{item.artist}</p>
                    </Link>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
                      <button className="text-xs font-medium text-neonPurple flex items-center gap-1.5 hover:text-purple-400 transition-colors">
                        <Download className="w-3.5 h-3.5" />
                        Get Link
                      </button>
                      <button className="text-softGray hover:text-softWhite">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 flex justify-center">
             <button 
               onClick={() => setOffset(o => o + 20)}
               disabled={loading}
               className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
             >
               {loading ? "Loading..." : "Load More"}
             </button>
          </div>

        </div>
      </div>

      <MiniPlayer />
    </div>
  );
}

export default function MusicPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading Music...</div>}>
      <MusicContent />
    </Suspense>
  );
}
