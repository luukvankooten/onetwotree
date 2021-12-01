import Search from "../components/Search";

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <div className="w-full h-64" />
      <div className="w-1/2 mx-auto">
        <Search />
      </div>
    </div>
  );
}
