import connectToDatabase from "@/lib/db/mongoose";
import Cache from "@/lib/models/Cache";

export async function getCachedData(key: string, fetcher: () => Promise<any>, ttlSeconds: number) {
  await connectToDatabase();
  
  if (process.env.MONGODB_URI) {
    try {
      const cached = await Cache.findOne({ key, expiresAt: { $gt: new Date() } });
      if (cached) {
        console.log(`[CACHE HIT] ${key}`);
        return cached.data;
      }
    } catch (e) {
      console.error("Cache read error", e);
    }
  }

  const data = await fetcher();
  
  if (process.env.MONGODB_URI && data) {
    try {
      await Cache.findOneAndUpdate(
        { key },
        { 
          key, 
          data, 
          expiresAt: new Date(Date.now() + ttlSeconds * 1000) 
        },
        { upsert: true }
      );
    } catch (e) {
      console.error("Cache write error", e);
    }
  }

  return data;
}
