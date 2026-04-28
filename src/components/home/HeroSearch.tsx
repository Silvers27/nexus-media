"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl relative group mb-16">
      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
        <Search className="h-6 w-6 text-softGray group-focus-within:text-neonBlue transition-colors" />
      </div>
      <input
        type="text"
        placeholder="Search movies, artists, albums..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="block w-full pl-16 pr-6 py-5 bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl text-lg text-softWhite placeholder-softGray focus:outline-none focus:border-neonBlue focus:ring-2 focus:ring-neonBlue/50 shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-all"
      />
      <button type="submit" className="absolute inset-y-2 right-2 bg-neonBlue hover:bg-blue-600 text-white px-8 rounded-xl font-bold transition-colors">
        Search
      </button>
    </form>
  );
}
