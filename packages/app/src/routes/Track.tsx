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
import { Link } from "react-router-dom";

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
    <div className="bg-gray-100 p-6 rounded">
      <div className="flex mb-4">
        <figure className="w-1/4 shadow-lg">
          <img
            className="object-fit h-full rounded"
            src={track.cover}
            alt="album cover"
          />
        </figure>
        <div className="w-3/4 mx-2 p-4 bg-white rounded flex flex-col shadow-lg">
          <div className="w-full text-6xl pb-2">{track.name}</div>
          <div className="w-full text-base font-bold">Artiest(en):</div>
          <div className="w-full text-base">
            {track.artists.map((artist, index) => {
              if (index !== track.artists.length) {
                return artist;
              }

              return `${artist}, `;
            })}
          </div>
          <div className="w-full flex-1 flex-auto">
            <div className="text-center text-6xl my-4">
              <Rating track={track} />
            </div>
            <div className="flex">
              <Link className="w-1/2 pr-2" to={`/tracks/${id}/ratings`}>
                <Button>Recensies</Button>
              </Link>
              <Link className="w-1/2 pr-2" to={`/tracks/${id}/comments`}>
                <Button>Opmerkingen</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 rounded bg-white p-4 shadow-lg">
        <Create trackId={track.id} />
      </div>

      <div className="flex">
        <div className="w-10 text-center py-2">
          <span className="inline-block h-full w-1 bg-gray-600 rounded shadow"></span>
        </div>
        <div className="w-full -py-4">
          {track.comments.map((comment, i) => (
            <div className="py-2">
              <Show comment={comment} index={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
