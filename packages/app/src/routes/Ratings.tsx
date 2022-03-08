import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Card from "../components/Layout/RatingCard";
import { getTrackBySpotifyId } from "../features/tracks/tracksSlice";

export default function Ratings() {
  const { id } = useParams();
  const track = useAppSelector(getTrackBySpotifyId(id || ""));

  if (!track) {
    return <Navigate to="/" />;
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
