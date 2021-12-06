import React from "react";
import Bar from "./Bar";
import Item from "./Item";

export default function Search() {
  return (
    <React.Fragment>
      <div className="border rounded-lg bg-white">
        <div className="border-b last:border-b-0">
          <Bar />
        </div>
        <div className="border-b last:border-b-0">
          <Item />
        </div>
        <div className="border-b last:border-b-0">
          <Item />
        </div>
        <div className="border-b last:border-b-0">
          <Item />
        </div>
      </div>
    </React.Fragment>
  );
}
