import React, { useEffect } from "react";
import Comment from "../features/comment/Comment";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchTrack, getTrack } from "../features/tracks/tracksSlice";

export default function RateTrack() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const track = useAppSelector(getTrack(id || ""));

  useEffect(() => {
    if (id) {
      dispatch(fetchTrack(id));
    }
  });

  if (!track) {
    return <div>Loading</div>;
  }

  console.log(id, track);
  return (
    <div>
      <figure className="flex">
        <img className="object-fit h-full rounded" src={track.cover} />
        <figcaption>{track.name}</figcaption>
      </figure>
      <Comment />
    </div>
  );
}
