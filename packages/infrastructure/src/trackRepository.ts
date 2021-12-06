import { ITrackReposistory } from "@12tree/domain";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN || "");

async function search(query: string) {
  const tracks = await spotifyApi.searchTracks(`track:${query}`);

  return (
    tracks.body.tracks?.items.slice(0, 10).map((item) => ({
      id: item.id,
      name: item.name,
      artists: item.artists.map((artist) => artist.name),
      cover: item.album.images.shift()?.url,
    })) || []
  );
}

const trackRepository: ITrackReposistory = { search };
export default trackRepository;
