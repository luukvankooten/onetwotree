import Comment from "./comment";
import { Rate, Rating } from "./rating";

export default interface Track {
  song: string;
  artist: string;
  comments: Comment[];
  ratings: Rate[];
}

export function getOveralRateing(track: Track): number {
  const sum = track.ratings
    .map((rating) => rating.rating)
    .reduce((p, c) => p + c, 0);
  const average = sum / track.ratings.length || 0;

  return Math.round(average * 2) / 2;
}
