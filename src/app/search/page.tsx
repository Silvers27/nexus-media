"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Music", "Movies", "Videos"];

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.results || []);
      })
      .catch(err => {
        console.error(err);
        setResults([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  const filteredResults = results.filter(item => {
    if (activeTab === "All") return true;
    if (activeTab === "Videos") return false; // Not implemented yet
    return item.type === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-softWhite">
          Search results for &quot;<span className="text-neonBlue">{query}</span>&quot;
        </h1>
        <div className="mt-4 flex flex-wrap gap-2 text-sm text-softGray">
          <span>Did you mean:</span>
          <button className="text-neonBlue hover:underline italic">{query} remix</button>
          <span>or</span>
          <button className="text-neonPurple hover:underline italic">{query} movie</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-10 border-b border-white/5 pb-px">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${
              activeTab === tab
                ? "border-neonBlue text-softWhite"
                : "border-transparent text-softGray hover:text-softWhite"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Mixed Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-square bg-white/5 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : filteredResults.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredResults.map((item) => (
            <div key={item.id} className="group relative rounded-xl overflow-hidden bg-card border border-white/5 hover:border-white/20 transition-all duration-300">
              <Link href={item.type === "Movie" ? `/movies/${item.id}` : `/music/${item.id}`} className={`block relative ${item.type === "Movie" ? "aspect-[2/3]" : "aspect-square"}`}>
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase tracking-wider">
                  {item.type}
                </div>
              </Link>
              <div className="p-4">
                <Link href={item.type === "Movie" ? `/movies/${item.id}` : `/music/${item.id}`} className="block">
                  <h3 className="text-softWhite font-medium truncate">{item.title}</h3>
                  <p className="text-xs text-softGray mt-1">{item.subtitle}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-softGray">
          No results found for &quot;{query}&quot;. Try a different search term.
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-softGray">Loading results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
