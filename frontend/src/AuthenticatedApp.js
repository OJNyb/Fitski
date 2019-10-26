import React, { useContext } from "react";
import { Route } from "react-router-dom";

import CreatePlan from "./components/CreatePlan/CreatePlan.js";
import Navigation from "./components/Navigation";
import Plans from "./components/PlanDashboard/Plans";
import PlanHOC from "./components/PlanHOC";
import Logout from "./components/Logout";
import History from "./components/History/History";
import Settings from "./components/Settings/Settings";

import { NavContext } from "./context/navContext";
import useNav from "./hooks/useNav";
import { ExerciseContext } from "./context/exerciseContext";
import useExercises from "./hooks/useExercises";
import useMobile from "./hooks/useMobile";

import "./App.css";
import "./styles/common.css";

function App() {
  const { state: exerciseState, dispatch: exerciseDispatch } = useExercises();
  const isMobile = useMobile();

  const { state, dispatch } = useNav();

  const { isDouble } = state;

  let marginTop;

  if (!isMobile) {
    marginTop = "66px";
  } else if (isMobile && !isDouble) {
    marginTop = "calc(7vh + 4px)";
  } else {
    marginTop = "12vh";
  }

  return (
    <NavContext.Provider value={{ state, dispatch }}>
      <Navigation />
      <main
        style={{
          marginLeft: isMobile ? 0 : "251px",
          marginTop
        }}
      >
        <Route exact path="/plans" component={Plans} />
        <Route exact path="/progress" component={CreatePlan} />
        <Route exact path="/create-plan" component={CreatePlan} />
        <Route exact path="/settings" component={Settings} />

        <Route exact path="/logout" component={Logout} />

        <ExerciseContext.Provider value={{ exerciseState, exerciseDispatch }}>
          <Route exact path="/history" component={History} />
          <Route path="/plans/:plan_id" component={PlanHOC} />
        </ExerciseContext.Provider>
      </main>
    </NavContext.Provider>
  );
}

export default App;
