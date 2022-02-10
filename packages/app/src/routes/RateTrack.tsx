import React, { useEffect } from "react";
import Comment from "../features/comment/Comment";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchTrack, getTrack } from "../features/tracks/tracksSlice";
import { createComment } from "../features/comment/commentSlice";
import Create from "../features/comment/components/Create";
import Rating from "../features/ratings/Rating";
import { getOveralRateing } from "@12tree/domain/src/entities/track";

export default function RateTrack() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const track = useAppSelector(getTrack(id || ""));

  useEffect(() => {
    console.log(id);
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
        <img className="object-fit h-full rounded" src={track.cover} />
        <figcaption>{track.name}</figcaption>
      </figure>
      <Rating rates={track.ratings} rating={getOveralRateing(track)} />
      <Create trackId={track.id} />
      <Comment comments={track.comments} />
    </div>
  );
}
