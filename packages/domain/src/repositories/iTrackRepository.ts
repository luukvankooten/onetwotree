import Track, { SearchTrack } from "../entities/track";

export default interface ITrackReposistory {
  search(query: string): Promise<SearchTrack[]>;
  get(id: string): Promise<Track>;
  update(track: Track): Promise<Track>;
  delete(id: string): Promise<Track>;
  create(id: string): Promise<Track>;
  findBySpotifyId(spotifyId: string): Promise<Track>;
}
