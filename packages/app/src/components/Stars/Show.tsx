import { Rating } from "@12tree/domain";
import React from "react";

interface ShowStarsProps {
  given: Rating;
}

export default function ShowStars({ given }: ShowStarsProps) {
  const stars = Array(5)
    .fill(0)
    .map((v, i) => <span>{i >= given ? "★" : "⭐️"}</span>);

  return <React.Fragment>{stars}</React.Fragment>;
}
