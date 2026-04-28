"use client";

import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function MiniPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed bottom-0 inset-x-0 bg-[#111827]/95 backdrop-blur-xl border-t border-white/10 z-50 transform transition-transform duration-300 translate-y-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center gap-4 w-1/4 min-w-0">
          <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-space">
            <Image
              src="https://placehold.co/150x150/111827/8b5cf6?text=Cover"
              alt="Currently playing"
              fill
              className="object-cover"
            />
          </div>
          <div className="truncate">
            <h4 className="text-sm font-semibold text-softWhite truncate">Water</h4>
            <p className="text-xs text-softGray truncate">Tyla</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 max-w-md flex flex-col items-center justify-center">
          <div className="flex items-center gap-6">
            <button className="text-softGray hover:text-softWhite transition-colors">
              <SkipBack className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 flex items-center justify-center bg-softWhite text-space rounded-full hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-1" />}
            </button>
            <button className="text-softGray hover:text-softWhite transition-colors">
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
          <div className="w-full flex items-center gap-2 mt-2">
            <span className="text-[10px] text-softGray">0:45</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden group cursor-pointer">
              <div className="h-full bg-neonBlue w-1/3 group-hover:bg-blue-400 relative"></div>
            </div>
            <span className="text-[10px] text-softGray">3:20</span>
          </div>
        </div>

        {/* Extra Controls */}
        <div className="w-1/4 flex justify-end items-center gap-4 hidden sm:flex">
          <Volume2 className="h-5 w-5 text-softGray" />
          <div className="w-24 h-1 bg-white/10 rounded-full cursor-pointer">
            <div className="h-full bg-softWhite w-2/3 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
