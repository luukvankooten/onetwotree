import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getTrackBySpotifyId,
  fetchTrackBySpotifyId,
} from "../features/tracks/tracksSlice";
import Rating from "../features/tracks/ratings/Rating";
import Create from "../features/tracks/comments/components/Create";
import Show from "../features/tracks/comments/components/Show";
import Button from "../components/Button/Button";

export default function Track() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const track = useAppSelector(getTrackBySpotifyId(id || ""));

  useEffect(() => {
    console.log(id);
    if (id && !track) {
      dispatch(fetchTrackBySpotifyId(id));
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
      <Button
        onClick={() => {
          navigate(`./ratings`);
        }}
      >
        Test
      </Button>
      <Rating track={track} />
      <Create trackId={track.id} />
      {track.comments.map((comment, i) => (
        <Show comment={comment} index={i} />
      ))}
    </div>
  );
}
