import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ExerciseContext } from "./context/exerciseContext";
import { NavContext } from "./context/navContext";
import useNav from "./hooks/useNav";
import useExercises from "./hooks/useExercises";
import useMobile from "./hooks/useMobile";
import useWindowWidth from "./hooks/useWindowWidth";

import SetLoading from "./components/SetLoading";
import Navigation from "./components/Navigation/Navigation";

import "./App.css";
import "./styles/common.css";

const CreatePlan = lazy(() => import("./components/CreatePlan/CreatePlan.js"));
const Plans = lazy(() => import("./components/PlanDashboard/Plans"));
const PlanHOC = lazy(() => import("./components/PlanHOC"));
const Logout = lazy(() => import("./components/Logout"));
const History = lazy(() => import("./components/History/History"));
const Settings = lazy(() => import("./components/Settings/Settings"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const Explore = lazy(() => import("./components/Explore/Explore"));
const NoMatch = lazy(() => import("./components/NoMatch"));

const TermsAndConditions = lazy(() =>
  import("./components/Terms/TermsAndConditions")
);
const PrivacyPolicy = lazy(() => import("./components/Terms/PrivacyPolicy"));

function App() {
  const { state: exerciseState, dispatch: exerciseDispatch } = useExercises();
  const isMobile = useMobile();
  const winWidth = useWindowWidth();

  const { state, dispatch } = useNav();

  let marginTop;
  let marginLeft = 0;
  let minHeight;
  let width;

  if (isMobile) {
    marginTop = "7vh";
    minHeight = "93vh";
    width = "calc(100%)";
  } else {
    marginTop = "66px";
    minHeight = "calc(100vh - 66px)";
    if (winWidth < 1000) {
      marginLeft = 0;
      width = "100%";
    } else {
      width = "calc(100% - 251px)";
      marginLeft = "251px";
    }
  }

  return (
    <NavContext.Provider value={{ state, dispatch }}>
      <Navigation />
      <main
        style={{
          width,
          marginTop,
          minHeight,
          marginLeft
        }}
      >
        <ExerciseContext.Provider
          value={{ state: exerciseState, dispatch: exerciseDispatch }}
        >
          <Suspense fallback={<SetLoading />}>
            <Switch>
              <Route exact path="/plans" component={Plans} />
              <Route exact path="/create-plan" component={CreatePlan} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/" component={History} />
              <Route exact path="/explore" component={Explore} />
              <Route path="/profile/:username" component={Profile} />
              <Route path="/plans/:plan_id" component={PlanHOC} />
              <Route path="/login">
                <Redirect to="/plans" />
              </Route>
              <Route path="/register">
                <Redirect to="/plans" />
              </Route>
              <Route exact path="/terms" component={TermsAndConditions} />
              <Route exact path="/privacy-policy" component={PrivacyPolicy} />

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
