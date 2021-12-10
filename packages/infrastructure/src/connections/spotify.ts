import SpotifyWebApi from "spotify-web-api-node";
import { Token, isTokenExpired } from "@12tree/domain";

let token: Token | undefined = undefined;

const api = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const spotify = async () => {
  if (!token || (token && isTokenExpired(token))) {
    const data = await api.clientCredentialsGrant();

    token = {
      accessToken: data.body["access_token"],
      refreshToken: "",
      expiresIn: data.body["expires_in"],
      createdAt: Date.now(),
    };

    api.setAccessToken(data.body["access_token"]);
  }

  return api;
};

export default spotify;
