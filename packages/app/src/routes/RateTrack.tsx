import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchTrack,
  getTrackBySpotifyId,
} from "../features/tracks/tracksSlice";
import Rating from "../features/tracks/ratings/Rating";
import Create from "../features/tracks/comments/components/Create";
import Show from "../features/tracks/comments/components/Show";

export default function RateTrack() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const track = useAppSelector(getTrackBySpotifyId(id || ""));

  useEffect(() => {
    if (id && !track) {
      dispatch(fetchTrack(id));
    }
  });

  if (!id) {
    return <div>Not found</div>;
  }

  if (!track) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <figure className="flex">
        <img
          className="object-fit h-full rounded"
          src={track.cover}
          alt="album cover"
        />
        <figcaption>{track.name}</figcaption>
      </figure>
      <Rating track={track} />
      <Create trackId={track.id} />
      {track.comments.map((comment, i) => (
        <Show comment={comment} index={i} />
      ))}
    </div>
  );
}
