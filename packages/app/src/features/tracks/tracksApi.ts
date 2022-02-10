import { Track } from "@12tree/domain";
import apiFetch from "../../utils/apiFetch";
import { Comment } from "@12tree/domain";

export async function fetchTrack(id: string, accessToken: string) {
  return await apiFetch<Track>(accessToken, `tracks/spotify/${id}`);
}
