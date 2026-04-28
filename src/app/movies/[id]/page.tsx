import Image from "next/image";
import { Play, Star, Calendar, Clock, Link2 } from "lucide-react";
import { fetchMovieDetails } from "@/lib/api/tmdb";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const movie = await fetchMovieDetails(params.id).catch(() => null);

  if (!movie) {
    return {
      title: "Movie Not Found | NexusMedia",
    };
  }

  return {
    title: `${movie.title} - Watch Legal | NexusMedia`,
    description: movie.overview,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: [`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`],
    },
  };
}

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  let movie = await fetchMovieDetails(params.id).catch(() => null);

  // Fallback for demo when API keys are not set
  if (!movie) {
    movie = {
      title: "Demo Movie",
      overview: "Please configure your TMDb API key to fetch live data.",
      release_date: "2024-01-01",
      runtime: 120,
      vote_average: 8.5,
      poster_path: null,
      backdrop_path: null,
      genres: [{ name: "Action" }, { name: "Sci-Fi" }]
    };
  }

  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://placehold.co/400x600/111827/3b82f6?text=No+Poster";
  const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : "https://placehold.co/1280x720/0f172a/111827";

  return (
    <div className="min-h-screen bg-space pb-24">
      {/* Backdrop */}
      <div className="relative h-[60vh] w-full">
        <Image 
          src={backdropUrl}
          alt={movie.title}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space via-space/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-64 relative z-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Poster */}
          <div className="w-64 md:w-80 flex-shrink-0 mx-auto md:mx-0">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image 
                src={posterUrl}
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <button className="w-full mt-6 bg-neonBlue hover:bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Play fill="currentColor" className="w-5 h-5" />
              Watch Trailer
            </button>
          </div>

          {/* Details */}
          <div className="flex-1 pt-8 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-4">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-softGray mb-8 text-sm md:text-base font-medium">
              <div className="flex items-center gap-1.5 text-yellow-400">
                <Star fill="currentColor" className="w-5 h-5" />
                <span className="text-white font-bold">{movie.vote_average?.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-5 h-5" />
                <span>{movie.release_date?.split("-")[0]}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-5 h-5" />
                <span>{movie.runtime} min</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
              {movie.genres?.map((g: any) => (
                <span key={g.name} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-softWhite">
                  {g.name}
                </span>
              ))}
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-bold text-softWhite mb-3">Overview</h3>
              <p className="text-softGray leading-relaxed max-w-3xl text-lg">
                {movie.overview}
              </p>
            </div>

            <div className="bg-card border border-white/5 rounded-2xl p-6 max-w-2xl">
              <h3 className="text-lg font-bold text-softWhite mb-4 flex items-center gap-2">
                <Link2 className="text-neonBlue" /> Official Streaming Sources
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-4 bg-space rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <span className="font-semibold text-white">Netflix</span>
                  <a href="#" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-lg transition-colors">Go to Netflix</a>
                </div>
                <div className="flex items-center justify-between p-4 bg-space rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <span className="font-semibold text-white">Amazon Prime</span>
                  <a href="#" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-lg transition-colors">Go to Prime</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
