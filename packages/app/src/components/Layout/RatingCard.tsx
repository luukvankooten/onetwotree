import { Rate } from "@12tree/domain";
import { Link } from "react-router-dom";
import ShowStars from "../Stars/Show";

interface CardProps {
  rate: Rate;
}

export default function RatingCard({ rate }: CardProps) {
  return (
    <div className="rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 pt-10 pb-4 text-5xl text-center">
        <ShowStars given={rate.rating} />
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <Link to={`/users/${rate.user.id}`}>{rate.user.username}</Link>
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {rate.createdAt}
        </span>
      </div>
    </div>
  );
}
