import { SearchTrack } from "@12tree/domain/src/entities/track";

export async function searchTrackApi(
  query: string,
  auth: string
): Promise<SearchTrack[]> {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${auth}`);

  const response = await fetch(
    `http://localhost:4000/api/v1/tracks/search?q=${query}`,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  );

  return (await response.json()) as SearchTrack[];
}
