import React from "react";
import { BrowserRouter, Route, Routes as ReactRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Auth from "../features/auth/Auth";
import About from "./About";
import Home from "./Home";
import Login from "./Login";
import Track from "./Track";
import Register from "./Register";
import Ratings from "./Ratings";
import User from "./User";
import Comments from "./Comments";

export default function Routes() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <ReactRouter>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
            <Route path="tracks/:id" element={<Track />} />
            <Route path="tracks/:id/ratings" element={<Ratings />} />
            <Route path="tracks/:id/comments" element={<Comments />} />
            <Route path="users/:id" element={<User />} />
          </Route>
        </ReactRouter>
      </BrowserRouter>
    </React.Fragment>
  );
}
