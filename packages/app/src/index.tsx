import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "core-js/es/promise";
import "core-js/es/set";
import "core-js/es/map";
import App from "./App";
import { store } from "./app/store";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
