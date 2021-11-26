import React from "react";
import { BrowserRouter, Route, Routes as ReactRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Auth from "../features/auth/Auth";
import About from "./About";
import Home from "./Home";
import Login from "./Login";
import RateTrack from "./RateTrack";

export default function Routes() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <ReactRouter>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Auth>
                <Layout />
              </Auth>
            }
          >
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="rate-track" element={<RateTrack />} />
          </Route>
        </ReactRouter>
      </BrowserRouter>
    </React.Fragment>
  );
}
