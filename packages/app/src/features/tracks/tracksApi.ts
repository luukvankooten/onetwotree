import { Track } from "@12tree/domain";
import apiFetch from "../../utils/apiFetch";

export async function fetchTrack(id: string, accessToken: string) {
  return await apiFetch<Track>(accessToken, `tracks/${id}`);
}

export async function fetchTrackBySpotifyId(
  spotifyId: string,
  accessToken: string
) {
  return await apiFetch<Track>(accessToken, `tracks/spotify/${spotifyId}`);
}
