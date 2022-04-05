import React from "react";
import Routes from "./routes";
import ErrorNotice from "./features/error/Error";

function App() {
  return (
    <React.Fragment>
      <ErrorNotice />
      <Routes />
    </React.Fragment>
  );
}

export default App;
