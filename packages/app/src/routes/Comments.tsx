import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Loading } from "../components/Loading";
import Show from "../features/tracks/comments/components/Show";
import {
  fetchTrackBySpotifyId,
  getTrackBySpotifyId,
} from "../features/tracks/tracksSlice";

export default function Comments() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const track = useAppSelector(getTrackBySpotifyId(id || ""));

  useEffect(() => {
    if (!track && id !== undefined) {
      dispatch(fetchTrackBySpotifyId(id));
    }
  });

  if (!track) {
    return <Loading />;
  }

  return (
    <div className="flex flex-wrap">
      {track.comments.map((comment, index) => (
        <div className="w-full pb-4">
          <Show comment={comment} index={index} key={index}></Show>
        </div>
      ))}
    </div>
  );
}
