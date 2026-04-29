# NexusMedia - The Ultimate Media Hub

This is a production-ready Next.js application that indexes music and movie metadata, providing users with official and legal streaming links.

## Architecture

- **Frontend:** Next.js 14 (App Router), Tailwind CSS, Framer Motion, Lucide React
- **Backend:** Next.js Serverless API Routes
- **Database:** MongoDB via Mongoose
- **Vector Search:** Pinecone (prepared in dependencies)

## Running Locally

1. Make sure you have Node.js installed.
2. Run `npm install` to install dependencies.
3. Create a `.env.local` file with the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   TMDB_API_KEY=your_tmdb_key
   THEAUDIODB_API_KEY=2
   GENIUS_ACCESS_TOKEN=your_genius_token
   YOUTUBE_API_KEY=your_youtube_key
   ```
4. Run `npm run dev` to start the development server.

## Features

- **High-Converting UI:** Modern dark mode with neon accents.
- **Legal Compliance:** Indexes metadata only, routes to official sources via `sourceLinks`.
- **Ingestion Pipeline:** API route at `/api/ingest` ready for Vercel Cron.
- **SEO Optimized:** SSR capabilities and clean component structure for maximum discoverability.

## Deployment

This app is optimized for **Vercel**. Push to GitHub and import to Vercel. Ensure you add `MONGODB_URI` to Vercel Environment Variables.
