import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { searchTrack } from "../searchSlice";
import Bar from "./Bar";
import Item from "./Item";
import { Link } from "react-router-dom";

export default function Search() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => {
    return state.search.items;
  });

  const trigger = (q: string) => {
    setTimeout(() => {
      dispatch(searchTrack(q));
    }, 500);
  };

  return (
    <div className="border rounded-lg bg-white">
      <div className="border-b last:border-b-0">
        <Bar onSubmit={(q) => console.log(q)} trigger={trigger} />
      </div>
      {items.slice(0, 10).map((item, index) => (
        <Link to={`/rate-track/${item.id}`}>
          <div className="border-b last:border-b-0 rounded" key={index}>
            <Item item={item} />
          </div>
        </Link>
      ))}
    </div>
  );
}
