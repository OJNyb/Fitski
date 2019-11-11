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

const CreatePlan = lazy(() => import("./components/CreatePlan/CreatePlan.js"));
const Plans = lazy(() => import("./components/PlanDashboard/Plans"));
const PlanHOC = lazy(() => import("./components/PlanHOC"));
const Logout = lazy(() => import("./components/Logout"));
const History = lazy(() => import("./components/History/History"));
const Settings = lazy(() => import("./components/Settings/Settings"));
const NoMatch = lazy(() => import("./components/NoMatch"));

function App() {
  const { state: exerciseState, dispatch: exerciseDispatch } = useExercises();
  const isMobile = useMobile();

  const { state, dispatch } = useNav();

  let marginTop;
  let marginLeft = 0;
  let minHeight;
  let width;

  if (!isMobile) {
    marginTop = "66px";
    marginLeft = "251px";
    minHeight = "calc(100vh - 66px)";
    width = "calc(100% - 251px)";
  } else if (isMobile) {
    marginTop = "7vh";
    minHeight = "93vh";
    width = "calc(100%)";
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
              <Route exact path="/progress" component={CreatePlan} />
              <Route exact path="/create-plan" component={CreatePlan} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/history" component={History} />
              <Route path="/plans/:plan_id" component={PlanHOC} />
              <Route path="/login">
                <Redirect to="/plans" />
              </Route>
              <Route path="/register">
                <Redirect to="/plans" />
              </Route>
              <Route path="*" component={NoMatch} />
            </Switch>
          </Suspense>
        </ExerciseContext.Provider>
        <Route exact path="/logout" component={Logout} />
      </main>
    </NavContext.Provider>
  );
}

export default App;
