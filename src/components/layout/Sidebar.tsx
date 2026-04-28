"use client";

import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

interface SidebarProps {
  type: "music" | "movies";
}

const movieGenreMap: Record<string, string> = {
  "All": "All",
  "Action": "28",
  "Drama": "18",
  "Comedy": "35",
  "Sci-Fi": "878",
  "Horror": "27",
  "Thriller": "53"
};

export default function Sidebar({ type }: SidebarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const currentGenre = searchParams.get("genre") || "All";
  const currentYear = searchParams.get("year") || "All Years";

  const genres = type === "music" 
    ? ["All", "Afrohouse", "Amapiano", "Deep House", "Pop", "Hip Hop", "R&B", "Electronic"]
    : ["All", "Action", "Drama", "Comedy", "Sci-Fi", "Horror", "Thriller"];

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All" || value === "All Years") {
      params.delete(name);
    } else {
      params.set(name, value);
    }
    return params.toString();
  };

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block pr-8">
      <div className="sticky top-28">
        <div className="flex items-center gap-2 mb-6">
          <SlidersHorizontal className="h-5 w-5 text-neonBlue" />
          <h2 className="text-lg font-heading font-semibold text-softWhite">Filters</h2>
        </div>

        <div className="space-y-8">
          {/* Genres Filter */}
          <div>
            <h3 className="text-sm font-medium text-softGray uppercase tracking-wider mb-4">Genre</h3>
            <ul className="space-y-3">
              {genres.map((genre, idx) => {
                const genreValue = type === "movies" ? movieGenreMap[genre] : genre;
                const isActive = (type === "movies" ? (searchParams.get("genre") || "All") : currentGenre) === genreValue;
                
                return (
                  <li key={idx}>
                    <Link 
                      href={`${pathname}?${createQueryString("genre", genreValue)}`}
                      className={`text-sm transition-colors block ${isActive ? "text-neonBlue font-bold" : "text-softGray hover:text-softWhite"}`}
                    >
                      {genre}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Year Filter (Simplified for now) */}
          {type === "movies" && (
            <div>
              <h3 className="text-sm font-medium text-softGray uppercase tracking-wider mb-4">Release Year</h3>
              <select 
                value={currentYear}
                onChange={(e) => {
                  window.location.href = `${pathname}?${createQueryString("year", e.target.value)}`;
                }}
                className="w-full bg-card border border-white/10 rounded-xl px-4 py-2.5 text-sm text-softWhite focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue"
              >
                <option>All Years</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
