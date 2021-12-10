import Search from "../features/search/components";

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <div className="w-full h-64" />
      <div className="w-full">
        <Search />
      </div>
    </div>
  );
}
