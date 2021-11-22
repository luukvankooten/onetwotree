import React from "react";
import Nav from "./components/Nav";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import routes from "./routes";
import type { History } from "history";

interface AppProps {
  history: History;
}

function App({ history }: AppProps) {
  return <Router history={history}>{routes}</Router>;
}

export default App;
