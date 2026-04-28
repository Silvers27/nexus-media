"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import Logo from "../ui/Logo";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-space/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Center: Prominent Search */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-softGray group-focus-within:text-neonBlue transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Find any song or movie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-card border border-white/10 rounded-xl leading-5 text-softWhite placeholder-softGray focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue transition-all"
              />
            </form>
          </div>

          {/* Right: Menu & CTA */}
          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex space-x-6">
              <Link href="/music" className="text-sm font-medium text-softGray hover:text-softWhite transition-colors">
                Music
              </Link>
              <Link href="/movies" className="text-sm font-medium text-softGray hover:text-softWhite transition-colors">
                Movies
              </Link>
              <Link href="/tools/video" className="text-sm font-medium text-softGray hover:text-softWhite transition-colors">
                Tools
              </Link>
              <Link href="/trending" className="text-sm font-medium text-softGray hover:text-softWhite transition-colors">
                Trending
              </Link>
            </nav>
            <Link 
              href="/explore"
              className="bg-neonBlue hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
