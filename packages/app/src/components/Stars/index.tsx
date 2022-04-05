import React, { useState } from "react";
import { Rating } from "@12tree/domain";

type Star = {
  filled: boolean;
  locked: boolean;
};
type TupleStars = [Star, Star, Star, Star, Star];

interface StarsProps {
  userRating?: Rating;
  onChange?: (stars: Rating) => void;
  given: Rating;
}

export default function Stars({ userRating, onChange, given }: StarsProps) {
  const [stars, setStars] = useState<TupleStars>(
    Array.from({ length: 5 }, (v, i) => {
      const ur = userRating ?? 0;

      if (i < ur && ur !== 0) {
        return { filled: true, locked: true };
      }

      return { filled: false, locked: false };
    }) as TupleStars
  );

  const handleOver = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    key: number
  ) => {
    const newStars = stars.map((val, i): Star => {
      if (!val.locked && i <= key) {
        val.filled = true;
      }

      return val;
    }) as TupleStars;

    setStars(newStars);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    key: number
  ) => {
    const newStars = stars.map((val, i) => {
      if (i > key && val.filled && val.locked) {
        val.filled = false;
        val.locked = false;
        return val;
      }

      if (i <= key) {
        val.filled = true;
        val.locked = true;
      }

      return val;
    }) as TupleStars;

    setStars(newStars);

    if (onChange) {
      onChange(newStars.filter((val) => val.filled).length);
    }
  };

  const handleLeave = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    key: number
  ) => {
    const newStars = stars.map((val, i) => {
      if (!val.locked) {
        val.filled = false;
      }

      return val;
    }) as TupleStars;

    setStars(newStars);
  };

  return (
    <React.Fragment>
      {stars.map((star, key) => (
        <span
          onMouseOver={(event) => handleOver(event, key)}
          onMouseLeave={(event) => handleLeave(event, key)}
          onClick={(event) => handleClick(event, key)}
          key={key}
          className="cursor-pointer"
        >
          {key < given && !star.filled ? "⭐️" : star.filled ? "🌟" : "★"}
        </span>
      ))}
    </React.Fragment>
  );
}
