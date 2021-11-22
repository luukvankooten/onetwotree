import Nav from "../components/Nav";
import { Routes, Route } from "react-router-dom";
import About from "./About";
import RateTrack from "./RateTrack";
import Home from "./Home";
import React from "react";

const routes = (
  <React.Fragment>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="rate-track" element={<RateTrack />} />
    </Routes>
  </React.Fragment>
);

export default routes;
