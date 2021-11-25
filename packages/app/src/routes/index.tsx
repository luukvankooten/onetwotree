import Nav from "../components/Nav";
import { BrowserRouter, Routes as ReactRouter, Route } from "react-router-dom";
import About from "./About";
import RateTrack from "./RateTrack";
import Home from "./Home";
import React from "react";
import Login from "./Login";
import Auth from "../features/auth/Auth";
import Layout from "../components/Layout";

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
