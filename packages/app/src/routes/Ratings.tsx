import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Card from "../components/Layout/RatingCard";
import { Loading } from "../components/Loading";
import {
  fetchTrackBySpotifyId,
  getTrackBySpotifyId,
} from "../features/tracks/tracksSlice";

export default function Ratings() {
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
    <section className="mt-10">
      <div className="text-7xl">Ratings</div>
      <div className="flex flex-wrap mt-4">
        {track?.ratings.map((rating, i) => (
          <div className="mx-6 px-">
            <Card rate={rating} key={i}></Card>
          </div>
        ))}
      </div>
    </section>
  );
}
