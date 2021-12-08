import { MongoTrack } from "../schemas/track";
import { Track } from "@12tree/domain";

export async function mapPropsToTrack(track: MongoTrack): Promise<Track> {
  return {
    id: track.id,
    spotifyId: track.spotifyId,
    name: track.name,
    cover: track.cover,
    artists: track.artists,
    ratings: [],
    comments: [],
    createdAt: track.createdAt,
    updatedAt: track.updatedAt,
  };
}
