import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { searchTrack, searchTracksByQuery } from "../searchSlice";
import Bar from "./Bar";
import Item from "./Item";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const items = useAppSelector(searchTracksByQuery(query));

  useEffect(() => {
    if (!!query.trim() && items.length === 0) {
      dispatch(searchTrack(query));
    }
  }, [query]);

  const trigger = useCallback(
    (q: string) => {
      setQuery(q);
    },
    [query]
  );

  return (
    <div className="border rounded-lg bg-white">
      <div className="border-b last:border-b-0">
        <Bar onSubmit={(q) => console.log(q)} trigger={trigger} />
      </div>
      {items.slice(0, 10).map((item, index) => (
        <Link to={`/tracks/${item.id}`}>
          <div className="border-b last:border-b-0 rounded" key={index}>
            <Item item={item} />
          </div>
        </Link>
      ))}
    </div>
  );
}
