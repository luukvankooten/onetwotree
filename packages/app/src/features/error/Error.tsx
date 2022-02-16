import React, { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { getError } from "./errorSlice";

export default function ErrorNotice() {
  const error = useAppSelector(getError);

  useEffect(() => {
    console.error(error);
  }, []);

  if (!error) {
    return null;
  }

  return (
    <div className="absolute w-full">
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">{error.message}</span>
      </div>
    </div>
  );
}
