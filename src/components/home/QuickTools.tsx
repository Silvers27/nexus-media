"use client";

import { Facebook } from "lucide-react";
import { useState } from "react";

export default function QuickTools() {
  const [links, setLinks] = useState({ tiktok: "", facebook: "" });

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-4xl">
      <div className="flex-1 min-w-[280px] bg-card/50 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:border-white/10 transition-colors">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#00f2fe] to-[#4facfe] flex items-center justify-center shrink-0">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.26 6.32 6.33 6.33 0 0 0 6.31-6.32V10.36a9.23 9.23 0 0 0 4.33 1.11V8.12a5.86 5.86 0 0 1-2.31-.43z"/>
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-softWhite">TikTok Analyzer</p>
          <input 
            type="text" 
            placeholder="Paste link..." 
            value={links.tiktok}
            onChange={(e) => setLinks({...links, tiktok: e.target.value})}
            className="w-full bg-transparent text-xs text-softGray placeholder-white/30 focus:outline-none mt-1" 
          />
        </div>
      </div>

      <div className="flex-1 min-w-[280px] bg-card/50 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:border-white/10 transition-colors">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#1877f2] to-[#3b5998] flex items-center justify-center shrink-0">
          <Facebook className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-softWhite">Facebook Preview</p>
          <input 
            type="text" 
            placeholder="Paste link..." 
            value={links.facebook}
            onChange={(e) => setLinks({...links, facebook: e.target.value})}
            className="w-full bg-transparent text-xs text-softGray placeholder-white/30 focus:outline-none mt-1" 
          />
        </div>
      </div>
    </div>
  );
}
