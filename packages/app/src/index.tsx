import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store, history } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { Routes, Route } from "react-router-dom";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import About from "./routes/About";
import RateTrack from "./routes/RateTrack";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="about" element={<About />} />
          <Route path="rate-track" element={<RateTrack />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
