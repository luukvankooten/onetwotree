import { ITrackReposistory } from "@12tree/domain";
import { SearchTrack } from "@12tree/domain/src/entities/track";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = (async () => {
  const api = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    // redirectUri: process.env.SPOTIFY_CALLBACK
  });

  if (!api.getAccessToken()) {
    const data = await api.clientCredentialsGrant();

    api.setAccessToken(data.body["access_token"]);
  }

  return api;
})();

const searchedResults: SearchTrack[] = [];

//Due: to rate limit cache
setTimeout(() => {
  searchedResults.length = 0;
}, 30000);

async function search(query: string) {
  try {
    const api = await spotifyApi;

    const tracks = await api.searchTracks(`track:${query}`);

    console.log("from api");

    const searched =
      tracks.body.tracks?.items.map((item) => ({
        id: item.id,
        name: item.name,
        artists: item.artists.map((artist) => artist.name),
        cover: item.album.images.shift()?.url,
      })) || [];

    searchedResults.push(...searched);
  } catch (err) {
    const filter = searchedResults.filter((item) => item.name.includes(query));

    if (filter.length >= 1) {
      console.log("chached");
      return filter;
    }
  }

  return searchedResults;
}

const trackRepository: ITrackReposistory = { search };
export default trackRepository;
