import React from "react";

interface OutletProps {
  name: JSX.Element | string;
  username: JSX.Element | string;
  email: JSX.Element | string;
  password?: JSX.Element | string;
}

export default function Outlet({
  name,
  username,
  email,
  password,
}: OutletProps) {
  return (
    <div className="flex flex-wrap">
      <div className="w-1/5 font-bold">Naam</div>
      <div className="w-4/5">{name}</div>
      <div className="w-1/5 font-bold">Gebruikersnaam</div>
      <div className="w-4/5">{username}</div>
      <div className="w-1/5 font-bold">Email</div>
      <div className="w-4/5">{email}</div>
      {password !== undefined && (
        <React.Fragment>
          <div className="w-1/5 font-bold">Wachtwoord</div>
          <div className="w-4/5">{password}</div>
        </React.Fragment>
      )}
    </div>
  );
}
