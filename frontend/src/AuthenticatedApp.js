import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ExerciseContext } from "./context/exerciseContext";
import { NavContext } from "./context/navContext";
import useNav from "./hooks/useNav";
import useExercises from "./hooks/useExercises";
import useMobile from "./hooks/useMobile";

import SetLoading from "./components/SetLoading";
import Navigation from "./components/Navigation/Navigation";

import "./App.css";
import "./styles/common.css";
import "./components/shared/NavMid/navMid.css";

const StripeConfirmation = lazy(() =>
  import("./components/Stripe/StripeConfirmation.js")
);
const CreatePlan = lazy(() => import("./components/CreatePlan/CreatePlan.js"));
const Plans = lazy(() => import("./components/PlanDashboard/Plans"));
const PlanHOC = lazy(() => import("./components/PlanHOC"));
const Logout = lazy(() => import("./components/Logout"));
const History = lazy(() => import("./components/History/History"));
const Settings = lazy(() => import("./components/Settings/Settings"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const Explore = lazy(() => import("./components/Explore/Explore"));
const NoMatch = lazy(() => import("./components/NoMatch"));
const Checkout = lazy(() => import("./components/Stripe/Checkout"));
const StripeCancel = lazy(() => import("./components/Stripe/StripeCancel"));
const StripeSuccess = lazy(() => import("./components/Stripe/StripeSuccess"));

const TermsAndConditions = lazy(() =>
  import("./components/Terms/TermsAndConditions")
);
const PrivacyPolicy = lazy(() => import("./components/Terms/PrivacyPolicy"));

function App() {
  const { state: exerciseState, dispatch: exerciseDispatch } = useExercises();
  const isMobile = useMobile();

  const { state, dispatch } = useNav();

  let minHeight = "100vh";
  let width;

  if (isMobile) {
    width = "100%";
  } else {
    width = "800px";
  }

  return (
    <NavContext.Provider value={{ state, dispatch }}>
      <Navigation />
      <main
        style={{
          width,
          minHeight,
          borderLeft: isMobile ? "0" : "1px solid rgb(233, 220, 220)"
        }}
      >
        <ExerciseContext.Provider
          value={{ state: exerciseState, dispatch: exerciseDispatch }}
        >
          <Suspense fallback={<SetLoading />}>
            <Switch>
              <Route exact path="/plans" component={Plans} />
              <Route exact path="/create-plan" component={CreatePlan} />
              <Route
                exact
                path="/stripe/register"
                component={StripeConfirmation}
              />

              <Route exact path="/settings" component={Settings} />
              <Route exact path="/" component={History} />
              <Route exact path="/discover" component={Explore} />
              <Route exact path="/checkout/:plan_id" component={Checkout} />
              <Route exact path="/stripe/success" component={StripeSuccess} />
              <Route exact path="/stripe/cancel" component={StripeCancel} />
              <Route path="/profile/:username" component={Profile} />
              <Route path="/plans/:plan_id" component={PlanHOC} />
              <Route path="/login">
                <Redirect to="/plans" />
              </Route>
              <Route path="/register">
                <Redirect to="/plans" />
              </Route>
              <Route exact path="/terms" component={TermsAndConditions} />
              <Route exact path="/privacy" component={PrivacyPolicy} />

              <Route exact path="/logout" component={Logout} />
              <Route path="*" component={NoMatch} />
            </Switch>
          </Suspense>
        </ExerciseContext.Provider>
      </main>
    </NavContext.Provider>
  );
}

export default App;
