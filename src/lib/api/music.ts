import { getCachedData } from "./cache";

const THEAUDIODB_API_KEY = process.env.THEAUDIODB_API_KEY || "2"; // Default '2' is for test
const GENIUS_ACCESS_TOKEN = process.env.GENIUS_ACCESS_TOKEN;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

/**
 * Normalizes different API responses into a unified "Track" format
 * that matches what the frontend previously expected from Spotify.
 */
function normalizeTrack(source: string, data: any) {
  if (source === "itunes") {
    return {
      id: `itunes-${data.trackId}`,
      name: data.trackName,
      artists: [{ name: data.artistName }],
      album: {
        name: data.collectionName,
        images: [{ url: data.artworkUrl100.replace("100x100", "600x600") }]
      },
      duration_ms: data.trackTimeMillis,
      preview_url: data.previewUrl,
      external_urls: { spotify: data.trackViewUrl }, // Keeping the key name for compatibility
      source: "iTunes"
    };
  }
  
  if (source === "theaudiodb") {
    return {
      id: `tadb-${data.idTrack}`,
      name: data.strTrack,
      artists: [{ name: data.strArtist }],
      album: {
        name: data.strAlbum,
        images: [{ url: data.strTrackThumb || "https://placehold.co/600x600/111827/8b5cf6?text=No+Cover" }]
      },
      duration_ms: parseInt(data.intDuration) || 0,
      source: "TheAudioDB"
    };
  }

  return data;
}

export async function searchMusic(query: string) {
  return getCachedData(`music_search_${query.toLowerCase()}`, async () => {
    try {
      // Primary search using iTunes API (fast, free, no key needed)
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`);
      if (!res.ok) throw new Error("iTunes search failed");
      
      const data = await res.json();
      const tracks = (data.results || []).map((track: any) => normalizeTrack("itunes", track));
      
      return { tracks: { items: tracks } };
    } catch (error) {
      console.error("Search Music Error:", error);
      return { tracks: { items: [] } };
    }
  }, 3600);
}

export async function fetchTrendingMusic(offset: number = 0) {
  return getCachedData(`music_trending_${offset}`, async () => {
    try {
      // Using TheAudioDB's popular tracks or a similar free source
      // For now, we'll use a set of "hot" search terms or a specific chart if available
      const res = await fetch(`https://www.theaudiodb.com/api/v1/json/${THEAUDIODB_API_KEY}/mostloved.php?format=track`);
      if (!res.ok) throw new Error("TheAudioDB trending failed");
      
      const data = await res.json();
      const tracks = (data.loved || []).slice(offset, offset + 20).map((track: any) => normalizeTrack("theaudiodb", track));
      
      // Wrap in the same structure Spotify used for trending (playlist items)
      return {
        items: tracks.map((track: any) => ({ track }))
      };
    } catch (error) {
      console.error("Trending Music Error:", error);
      return { items: [] };
    }
  }, 86400);
}

export async function fetchTrackDetails(id: string) {
  return getCachedData(`music_track_${id}`, async () => {
    try {
      if (id.startsWith("itunes-")) {
        const actualId = id.replace("itunes-", "");
        const res = await fetch(`https://itunes.apple.com/lookup?id=${actualId}`);
        const data = await res.json();
        const track = normalizeTrack("itunes", data.results[0]);
        
        // Enhance with YouTube link and Genius lyrics if possible
        const youtubeData = await searchYouTube(`${track.name} ${track.artists[0].name}`);
        const geniusData = await searchGenius(`${track.name} ${track.artists[0].name}`);
        
        return {
          ...track,
          youtubeId: youtubeData?.[0]?.id?.videoId,
          lyricsUrl: geniusData?.[0]?.result?.url
        };
      }
      
      return null;
    } catch (error) {
      console.error("Track Details Error:", error);
      return null;
    }
  }, 604800);
}

export async function searchMusicByGenre(genre: string, offset: number = 0) {
  // Map genre search to iTunes search
  const query = genre === "All" ? "2024" : genre;
  return searchMusic(query);
}

async function searchYouTube(query: string) {
  if (!YOUTUBE_API_KEY) return null;
  try {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + " official audio")}&type=video&key=${YOUTUBE_API_KEY}&maxResults=1`);
    const data = await res.json();
    return data.items;
  } catch (e) {
    return null;
  }
}

async function searchGenius(query: string) {
  if (!GENIUS_ACCESS_TOKEN) return null;
  try {
    const res = await fetch(`https://api.genius.com/search?q=${encodeURIComponent(query)}`, {
      headers: { Authorization: `Bearer ${GENIUS_ACCESS_TOKEN}` }
    });
    const data = await res.json();
    return data.response.hits;
  } catch (e) {
    return null;
  }
}
