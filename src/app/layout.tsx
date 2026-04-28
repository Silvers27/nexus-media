import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "NexusMedia | Find Any Song or Movie Instantly",
  description: "The ultimate legal media discovery platform. Stream music, find movies, and extract social media metadata in seconds.",
  keywords: ["music", "movies", "streaming", "metadata", "legal media", "entertainment"],
  openGraph: {
    title: "NexusMedia",
    description: "Find Any Song or Movie Instantly",
    type: "website",
    url: "https://nexus-media.vercel.app",
    siteName: "NexusMedia",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexusMedia",
    description: "The ultimate hub for all your entertainment needs.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-space text-white min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
