import React from "react";
import { Outlet } from "react-router";
import Nav from "../Nav";

export default function Layout() {
  return (
    <React.Fragment>
      <Nav />
      <main className="min-h-full container mx-auto">
        <Outlet />
      </main>
    </React.Fragment>
  );
}
