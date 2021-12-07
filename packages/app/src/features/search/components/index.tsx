import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { searchTrack } from "../searchSlice";
import Bar from "./Bar";
import Item from "./Item";

export default function Search() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => {
    return state.search.items.slice(0, 10);
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
      {items.map((item, index) => (
        <div className="border-b last:border-b-0 rounded" key={index}>
          <Item item={item} />
        </div>
      ))}
    </div>
  );
}
