import React from "react";
import { Route } from "react-router-dom";

import Landing from "./components/noauth/Landing";

const UnauthenticatedApp = () => {
  return (
    <>
      <Route exact path="/" component={Landing} />
    </>
  );
};

export default UnauthenticatedApp;
