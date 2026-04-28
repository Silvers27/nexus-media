import Image from "next/image";
import Link from "next/link";
import { Play, Music } from "lucide-react";

const mockTrending = [
  {
    id: "1",
    title: "Dune: Part Two",
    type: "movie",
    image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2TDpiuPev.jpg",
    year: "2024",
  },
  {
    id: "2",
    title: "Blinding Lights",
    type: "music",
    artist: "The Weeknd",
    image: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
  },
  {
    id: "3",
    title: "Oppenheimer",
    type: "movie",
    image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    year: "2023",
  },
  {
    id: "4",
    title: "Cruel Summer",
    type: "music",
    artist: "Taylor Swift",
    image: "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647",
  },
];

export default function TrendingGrid() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
          <span className="w-2 h-8 rounded-full bg-neonPurple inline-block"></span>
          Trending Now
        </h2>
        <Link href="/trending" className="text-sm font-medium text-neonBlue hover:text-white transition-colors">
          View All &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {mockTrending.map((item) => (
          <Link href={`/${item.type}/${item.id}`} key={item.id} className="group relative rounded-2xl overflow-hidden bg-space border border-white/5 hover:border-neonBlue/50 transition-all duration-300">
            <div className="aspect-[2/3] relative">
              <Image 
                src={item.image} 
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-neonBlue/90 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                  {item.type === 'movie' ? <Play className="w-6 h-6 text-white ml-1" /> : <Music className="w-6 h-6 text-white" />}
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-neonPurple mb-1">
                {item.type}
              </div>
              <h3 className="text-white font-medium truncate">{item.title}</h3>
              <p className="text-sm text-gray-400 truncate">
                {item.type === 'movie' ? item.year : item.artist}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
