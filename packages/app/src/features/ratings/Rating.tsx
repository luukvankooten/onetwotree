import { Rate } from "@12tree/domain";
import React, { useEffect, useRef } from "react";

interface RatingProps {
  rates: Rate[];
  rating: number;
}

export default function Rating({ rates, rating }: RatingProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const elements = ref.current?.getElementsByTagName("span");
    var inputList: Element[] = Array.prototype.slice.call(elements);

    if (!elements) {
      return;
    }

    for (const key of inputList) {
      const content = getComputedStyle(key, "::before").content;

      console.log(content);

      // console.log(new RegExp("\2B00-\2BFF").test(content));

      // if (/([\2B00-\2BFF])/.test(content)) {
      //   console.log(content);
      // }
    }
  };

  return (
    <div className="w-auto">
      <div className="rating" ref={ref} onClick={handleClick}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
