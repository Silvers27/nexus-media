"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Sparkles, Music, Film, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const categories = [
  { name: "Afrohouse", type: "Music", icon: Music, color: "from-orange-500 to-red-500" },
  { name: "Action", type: "Movie", icon: Film, color: "from-blue-500 to-cyan-500" },
  { name: "Deep House", type: "Music", icon: Music, color: "from-purple-500 to-indigo-500" },
  { name: "Drama", type: "Movie", icon: Film, color: "from-pink-500 to-rose-500" },
  { name: "Sci-Fi", type: "Movie", icon: Film, color: "from-green-500 to-emerald-500" },
  { name: "Hip Hop", type: "Music", icon: Music, color: "from-yellow-500 to-amber-500" },
  { name: "Comedy", type: "Movie", icon: Film, color: "from-purple-400 to-pink-400" },
  { name: "Electronic", type: "Music", icon: Music, color: "from-blue-400 to-indigo-400" },
];

export default function ExplorePage() {
  const router = useRouter();
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRandomPick = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const randomCat = categories[Math.floor(Math.random() * categories.length)];
      router.push(`/search?q=${randomCat.name}`);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-3xl bg-neonPurple/10 text-neonPurple mb-6">
          <Compass className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-4">Explore New Horizons</h1>
        <p className="text-softGray max-w-2xl mx-auto text-lg">
          Dive deep into specific genres or let us surprise you with something fresh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {categories.map((cat, idx) => (
          <Link 
            key={idx} 
            href={`/search?q=${cat.name}`}
            className="group relative overflow-hidden rounded-3xl bg-card border border-white/5 p-8 transition-all hover:-translate-y-2 hover:border-white/20"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-10 blur-2xl group-hover:opacity-30 transition-opacity`}></div>
            <cat.icon className="h-8 w-8 text-softGray mb-6 group-hover:text-white transition-colors" />
            <span className="text-xs font-bold text-softGray uppercase tracking-widest mb-2 block">{cat.type}</span>
            <h3 className="text-2xl font-bold text-white mb-4">{cat.name}</h3>
            <div className="flex items-center gap-2 text-sm font-semibold text-neonBlue opacity-0 group-hover:opacity-100 transition-opacity">
              Explore <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>

      {/* Random Section */}
      <div className="bg-gradient-to-r from-neonBlue/10 to-neonPurple/10 border border-white/5 rounded-[40px] p-12 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">Can&apos;t decide?</h2>
          <p className="text-softGray mb-10 max-w-md mx-auto">
            Let our algorithm pick a trending genre for you to explore right now.
          </p>
          <button 
            onClick={handleRandomPick}
            disabled={isSpinning}
            className={`bg-white text-black font-black px-12 py-5 rounded-2xl flex items-center gap-3 mx-auto transition-all hover:scale-105 active:scale-95 ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Sparkles className={`h-5 w-5 ${isSpinning ? 'animate-spin' : ''}`} />
            {isSpinning ? "Picking..." : "Surprise Me!"}
          </button>
        </div>
      </div>
    </div>
  );
}
