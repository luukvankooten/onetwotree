import React from "react";
import { Outlet } from "react-router";
import Nav from "../Nav";

export default function Layout() {
  return (
    <React.Fragment>
      <Nav />
      <Outlet />
    </React.Fragment>
  );
}
