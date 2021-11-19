import React from "react";
import Nav from "../components/Nav";
import Comment from "../features/comment/Comment";

export default function RateTrack() {
  return (
    <React.Fragment>
      <Nav />
      <div>
        <Comment />
      </div>
    </React.Fragment>
  );
}
