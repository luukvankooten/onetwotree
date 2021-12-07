import { SearchTrack } from "../entities/track";

export default interface ITrackReposistory {
  search(query: string): Promise<SearchTrack[]>;
}
