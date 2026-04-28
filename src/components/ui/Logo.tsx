import Link from "next/link";
import { PlayCircle } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-neonBlue to-neonPurple group-hover:scale-105 transition-transform duration-300">
        <PlayCircle className="w-6 h-6 text-white" />
      </div>
      <span className="text-2xl font-heading font-bold tracking-tight text-white">
        Nexus<span className="text-neonBlue">Media</span>
      </span>
    </Link>
  );
}
