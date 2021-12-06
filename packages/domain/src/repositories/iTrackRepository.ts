export default interface ITrackReposistory {
  search(
    query: string
  ): Promise<
    { id: string; name: string; cover: string | undefined; artists: string[] }[]
  >;
}
