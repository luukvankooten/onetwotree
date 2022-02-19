import {
  Track,
  Rating as DomainRating,
  getOveralRateing,
} from "@12tree/domain";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/hooks";
import Stars from "../../../components/Stars";
import { getUserRate } from "../tracksSlice";
import { obtainRating } from "./RatingActions";

interface RatingProps {
  track: Track;
}

export default function Rating({ track }: RatingProps) {
  const dispatch = useAppDispatch();
  const userRating = useSelector(getUserRate(track.id));

  const getOveralRating = useCallback(() => {
    const rates = getOveralRateing(track);

    return rates;
  }, [track]);

  const onChange = useCallback(
    (stars: DomainRating) => {
      dispatch(
        obtainRating({
          id: track.id,
          rates: stars,
        })
      );
    },
    [dispatch, track]
  );

  return (
    <div className="w-auto">
      <Stars
        given={getOveralRating()}
        userRating={userRating?.rating}
        onChange={onChange}
      />
    </div>
  );
}
