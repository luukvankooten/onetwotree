import { MongoTrack } from "../schemas/track";
import { IUserReposistory, Track } from "@12tree/domain";
import { mapPropsToComment, mapPropsToRate } from ".";

export async function mapPropsToTrack(
  track: MongoTrack,
  userRepo: IUserReposistory
): Promise<Track> {
  return {
    id: track.id,
    spotifyId: track.spotifyId,
    name: track.name,
    cover: track.cover,
    artists: track.artists,
    ratings: await Promise.all(
      track.ratings.map(async (rating) =>
        mapPropsToRate(rating, await userRepo.get(rating.user_id))
      )
    ),
    comments: await Promise.all(
      track.comments.map(async (comment) =>
        mapPropsToComment(comment, await userRepo.get(comment.user_id))
      )
    ),
    createdAt: track.createdAt,
    updatedAt: track.updatedAt,
  };
}
