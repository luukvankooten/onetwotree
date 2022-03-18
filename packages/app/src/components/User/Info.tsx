import { User } from "@12tree/domain";

interface InfoProps {
  user: User;
}

export default function Info({ user }: InfoProps) {
  return (
    <div className="rounded bg-white p-2 shadow-lg flex flex-wrap">
      <div className="w-1/5 font-bold">Naam</div>
      <div className="w-4/5">{user.name}</div>
      <div className="w-1/5 font-bold">Gebruikersnaam</div>
      <div className="w-4/5">{user.username}</div>
      <div className="w-1/5 font-bold">Email</div>
      <div className="w-4/5">{user.email}</div>
    </div>
  );
}
