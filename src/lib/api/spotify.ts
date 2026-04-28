import { getCachedData } from "./cache";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let accessToken = "";
let tokenExpirationTime = 0;

async function getAccessToken() {
  if (accessToken && Date.now() < tokenExpirationTime) {
    return accessToken;
  }

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    console.warn("Spotify API credentials missing.");
    return null;
  }

  const basicAuth = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch Spotify access token");

  accessToken = data.access_token;
  tokenExpirationTime = Date.now() + data.expires_in * 1000 - 60000; // 1 min buffer
  return accessToken;
}

export async function fetchTrendingMusic(offset: number = 0) {
  const token = await getAccessToken();
  if (!token) return [];

  return getCachedData(`spotify_trending_music_offset_${offset}`, async () => {
    // Fetching the Global Top 50 playlist as a proxy for trending music
    const res = await fetch(`https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?limit=20&offset=${offset}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to fetch trending music");
    return res.json();
  }, 86400); // 24 hours
}

export async function fetchTrackDetails(id: string) {
  const token = await getAccessToken();
  if (!token) return null;

  return getCachedData(`spotify_track_${id}`, async () => {
    const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to fetch track details");
    return res.json();
  }, 604800); // 7 days
}

export async function searchMusic(query: string) {
  const token = await getAccessToken();
  if (!token) return [];

  return getCachedData(`spotify_search_${query.toLowerCase()}`, async () => {
    const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to search music");
    return res.json();
  }, 3600); // 1 hour
}

export async function searchMusicByGenre(genre: string, offset: number = 0) {
  const token = await getAccessToken();
  if (!token) return { tracks: { items: [] } };

  const query = genre === "All" ? "year:2024" : `genre:${genre}`;

  return getCachedData(`spotify_genre_${genre}_${offset}`, async () => {
    const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20&offset=${offset}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to fetch music by genre");
    const data = await res.json();
    
    // Normalize to look like a playlist response if needed, but we'll handle it in the route
    return data;
  }, 86400); // 24 hours
}
