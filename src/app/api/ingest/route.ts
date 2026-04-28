import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongoose';
import MediaItem from '@/models/MediaItem';

// This is a webhook/cron endpoint to trigger ingestion
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // In a real scenario, this would call various adapters (SpotifyAdapter, TMDbAdapter)
    // and sync new trending content to the database.
    
    // Example pseudo-code:
    // const movies = await TMDbAdapter.getTrending();
    // await MediaItem.insertMany(movies);

    return NextResponse.json({ success: true, message: 'Ingestion pipeline executed successfully.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
