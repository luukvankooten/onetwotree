import { SearchTrack } from "@12tree/domain/src/entities/track";

type ItemProps = {
  item: SearchTrack;
};

export default function Item({ item }: ItemProps) {
  return (
    <figure className="p-3 text-lg flex h-16">
      <img className="object-fit h-full rounded" src={item.cover} />
      <figcaption className="flex-1 pl-3">
        <div className="text-base">{item.name}</div>
        <div className="text-sm text-gray-600">{item.artists}</div>
      </figcaption>
    </figure>
  );
}
