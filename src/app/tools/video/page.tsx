"use client";

import { useState } from "react";
import { Link2, Search, ExternalLink, ShieldAlert } from "lucide-react";
import Image from "next/image";

export default function VideoToolPage() {
  const [url, setUrl] = useState("");
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      setIsAnalyzed(true);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      
      {/* Centered Card */}
      <div className="w-full max-w-3xl bg-card border border-white/5 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-neonBlue to-neonPurple"></div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-softWhite mb-4">
            Social Video Analyzer
          </h1>
          <p className="text-softGray max-w-xl mx-auto">
            Extract rich metadata from TikTok and Facebook videos. We prioritize strict compliance with copyright rules.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative flex items-center mb-6">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Link2 className="h-5 w-5 text-softGray" />
          </div>
          <input
            type="url"
            required
            placeholder="Paste video link here..."
            className="block w-full pl-14 pr-36 py-4 rounded-2xl bg-space border border-white/10 text-softWhite placeholder-softGray focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue transition-all text-lg"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setIsAnalyzed(false);
            }}
          />
          <button
            type="submit"
            className="absolute right-2 px-6 py-2.5 bg-neonBlue hover:bg-blue-600 text-white font-semibold rounded-xl transition-all flex items-center gap-2 shadow-lg"
          >
            <Search className="w-4 h-4" /> Analyze
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-xs text-softGray">
          <ShieldAlert className="w-4 h-4 text-neonPurple" />
          <span>No download functionality provided. We strictly adhere to terms of service.</span>
        </div>

        {/* Results Section */}
        {isAnalyzed && (
          <div className="mt-12 pt-10 border-t border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-semibold text-softWhite mb-6">Extracted Metadata</h3>
            
            <div className="flex flex-col sm:flex-row gap-8 bg-space/50 p-6 rounded-2xl border border-white/5">
              {/* Video Preview Mock */}
              <div className="w-full sm:w-48 aspect-[9/16] relative rounded-xl overflow-hidden bg-space flex-shrink-0 border border-white/10">
                <Image 
                  src="https://placehold.co/500x888/111827/8b5cf6?text=TikTok" 
                  alt="Video thumbnail"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Metadata */}
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="text-xl font-bold text-softWhite mb-2 line-clamp-2">
                  When the beat drops and the whole crowd loses it 🔥
                </h4>
                <p className="text-neonBlue font-medium mb-6">@creator_name</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-softGray">
                    <span className="bg-white/5 px-3 py-1 rounded-md">2.4M Views</span>
                    <span className="bg-white/5 px-3 py-1 rounded-md">450K Likes</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-8">
                    <a href="#" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-softWhite font-semibold rounded-xl transition-colors flex items-center gap-2">
                      View Original
                    </a>
                    <a href="#" className="px-6 py-3 bg-neonBlue hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                      <ExternalLink className="w-4 h-4" /> Open Source
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
