import Link from "next/link";
import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-space border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-sm text-softGray leading-relaxed">
              The ultimate media discovery engine. Explore thousands of movies and tracks from official sources globally.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-softGray">
              <li><Link href="/music" className="hover:text-neonBlue transition-colors">Music Library</Link></li>
              <li><Link href="/movies" className="hover:text-neonBlue transition-colors">Movie Directory</Link></li>
              <li><Link href="/trending" className="hover:text-neonBlue transition-colors">Trending Charts</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Tools</h4>
            <ul className="space-y-4 text-sm text-softGray">
              <li><Link href="/tools/video" className="hover:text-neonBlue transition-colors">TikTok Analyzer</Link></li>
              <li><Link href="/tools/video" className="hover:text-neonBlue transition-colors">Facebook Preview</Link></li>
              <li><Link href="/explore" className="hover:text-neonBlue transition-colors">Explore</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-softGray">
              <li><Link href="/dmca" className="hover:text-neonBlue transition-colors">DMCA Policy</Link></li>
              <li><Link href="/terms" className="hover:text-neonBlue transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-neonBlue transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-softGray">
            &copy; {new Date().getFullYear()} NexusMedia. All rights reserved. Built for creators and fans.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-softGray hover:text-white transition-colors"><span className="sr-only">Twitter</span> 𝕏</a>
            <a href="#" className="text-softGray hover:text-white transition-colors"><span className="sr-only">Instagram</span> IG</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
