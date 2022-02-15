import Comment from "./comment";
import Rate from "./rating";

export interface SearchTrack {
  id: string;
  name: string;
  cover: string | undefined;
  artists: string[];
}

export function getOveralRateing(track: Track): number {
  const sum = track.ratings
    .map((rating) => rating.rating)
    .reduce((p, c) => p + c, 0);
  const average = sum / track.ratings.length || 0;

  return Math.round(average * 2) / 2;
}

export default interface Track {
  id: string;
  spotifyId: string;
  name: string;
  artists: string[];
  cover: string;
  comments: Comment[];
  ratings: Rate[];
  createdAt: number;
  updatedAt?: number;
}
