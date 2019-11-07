import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import SetLoading from "./components/SetLoading";

const Landing = lazy(() => import("./components/noauth/Landing"));
const Login = lazy(() => import("./components/noauth/MobileLogin"));
const Register = lazy(() => import("./components/noauth/MobileRegister"));
const NoMatch = lazy(() => import("./components/NoMatch"));

const UnauthenticatedApp = () => {
  return (
    <Suspense fallback={SetLoading}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/history">
          <Redirect to="/login" />
        </Route>
        <Route path="*" component={NoMatch} />
      </Switch>
    </Suspense>
  );
};

export default UnauthenticatedApp;
