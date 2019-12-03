import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import SetLoading from "./components/SetLoading";

const Landing = lazy(() => import("./components/noauth/Landing"));
const Login = lazy(() => import("./components/noauth/MobileLogin"));
const Register = lazy(() => import("./components/noauth/MobileRegister"));
const ForgotPassword = lazy(() => import("./components/noauth/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/noauth/ResetPassword"));

const NoMatch = lazy(() => import("./components/NoMatch"));
const TermsAndConditions = lazy(() =>
  import("./components/Terms/TermsAndConditions")
);
const PrivacyPolicy = lazy(() => import("./components/Terms/PrivacyPolicy"));

const UnauthenticatedApp = () => {
  return (
    <Suspense fallback={<SetLoading />}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgot" component={ForgotPassword} />
        <Route exact path="/reset/:token" component={ResetPassword} />
        <Route exact path="/history">
          <Redirect to="/login" />
        </Route>
        <Route path="/plans">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/create-plan">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/signup">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/logout">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/terms" component={TermsAndConditions} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </Suspense>
  );
};

export default UnauthenticatedApp;
