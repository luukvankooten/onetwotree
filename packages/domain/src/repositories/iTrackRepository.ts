export default interface ITrackReposistory {
  search(query: string): Promise<{ id: string; song: string; cover: string }[]>;
}
