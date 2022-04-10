import { SearchTrack } from "@12tree/domain/src/entities/track";
import ApiFetch from "../../utils/apiFetch";

export async function searchTrackApi(
  query: string,
  auth: string
): Promise<SearchTrack[]> {
  return await ApiFetch<SearchTrack[]>(auth, `tracks/search?q=${query}`);
}
