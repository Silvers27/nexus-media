import Image from "next/image";
import { Play, Clock, Link2, ExternalLink } from "lucide-react";
import { fetchTrackDetails } from "@/lib/api/music";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const track = await fetchTrackDetails(params.id).catch(() => null);

  if (!track) {
    return {
      title: "Track Not Found | NexusMedia",
    };
  }

  return {
    title: `${track.name} by ${track.artists[0].name} | NexusMedia`,
    description: `Listen to ${track.name} by ${track.artists[0].name} from the album ${track.album.name}. Find official streaming links.`,
    openGraph: {
      title: track.name,
      images: [track.album.images[0]?.url],
    },
  };
}

export default async function MusicDetailsPage({ params }: { params: { id: string } }) {
  let track = await fetchTrackDetails(params.id).catch(() => null);

  // Fallback for demo when API keys are not set
  if (!track) {
    track = {
      name: "Demo Track",
      artists: [{ name: "Demo Artist" }],
      album: { name: "Demo Album", images: [] },
      duration_ms: 180000,
    };
  }

  const albumArt = track.album.images[0]?.url || "https://placehold.co/600x600/111827/8b5cf6?text=No+Cover";

  return (
    <div className="min-h-screen bg-space pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start bg-card border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neonPurple/10 blur-[100px] rounded-full pointer-events-none"></div>

          {/* Album Art */}
          <div className="w-64 md:w-80 aspect-square flex-shrink-0 relative group">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative z-10">
              <Image 
                src={albumArt}
                alt={track.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
               <button className="w-20 h-20 rounded-full bg-neonPurple flex items-center justify-center text-white shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-110 transition-transform">
                  <Play fill="currentColor" className="w-8 h-8 ml-2" />
               </button>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left relative z-10">
            <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-neonPurple tracking-widest uppercase">
              Single / Track
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-2">
              {track.name}
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-softGray mb-8">
              {track.artists.map((a: any) => a.name).join(", ")}
            </h2>
            
            <div className="flex items-center justify-center md:justify-start gap-6 text-softGray text-sm font-medium mb-10">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-softGray"></span>
                <span>Album: <span className="text-softWhite">{track.album.name}</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{Math.floor(track.duration_ms / 60000)}:{(Math.floor(track.duration_ms / 1000) % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* Links */}
            <div className="max-w-md mx-auto md:mx-0">
              <h3 className="text-sm font-bold text-softWhite mb-4 uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
                <Link2 className="w-4 h-4 text-neonPurple" /> Official Links
              </h3>
              
              <div className="flex flex-col gap-3">
                {track.youtubeId && (
                  <a href={`https://www.youtube.com/watch?v=${track.youtubeId}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-space rounded-xl border border-white/5 hover:border-[#FF0000]/50 hover:bg-white/5 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" />
                      </div>
                      <span className="font-bold text-white">YouTube</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-softGray group-hover:text-white transition-colors" />
                  </a>
                )}

                {track.lyricsUrl && (
                  <a href={track.lyricsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-space rounded-xl border border-white/5 hover:border-[#ffff64]/50 hover:bg-white/5 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#ffff64] flex items-center justify-center text-black font-bold text-xs">
                        G
                      </div>
                      <span className="font-bold text-white">Genius Lyrics</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-softGray group-hover:text-white transition-colors" />
                  </a>
                )}

                {track.external_urls?.spotify && (
                  <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-space rounded-xl border border-white/5 hover:border-[#1DB954]/50 hover:bg-white/5 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center">
                         <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                         </svg>
                      </div>
                      <span className="font-bold text-white">Apple Music / iTunes</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-softGray group-hover:text-[#1DB954] transition-colors" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
