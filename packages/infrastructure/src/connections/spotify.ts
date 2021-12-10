import SpotifyWebApi from "spotify-web-api-node";

const api = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const spotify = async () => {
  if (!api.getAccessToken()) {
    const data = await api.clientCredentialsGrant();

    api.setAccessToken(data.body["access_token"]);
  }

  return api;
};

export default spotify;
