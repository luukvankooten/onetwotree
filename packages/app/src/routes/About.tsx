import React from "react";
import Nav from "../components/Nav";

function About() {
  return (
    <React.Fragment>
      <Nav />
      <div>
        <h1 className="text-xl font-semibold">About</h1>
        <img src="/entities.png" />
      </div>
    </React.Fragment>
  );
}

export default About;
