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
  let marginLeft = 0;
  let minHeight;

  if (!isMobile) {
    marginTop = "66px";
    marginLeft = "251px";
    minHeight = "calc(100vh - 251px)";
  } else if (isMobile && !isDouble) {
    marginTop = "7vh";
    minHeight = "93vh";
  } else {
    marginTop = "14vh";
    minHeight = "86vh";
  }

  console.log(exerciseState);

  return (
    <NavContext.Provider value={{ state, dispatch }}>
      <Navigation />
      <main
        style={{
          marginLeft,
          marginTop,
          minHeight
        }}
      >
        <ExerciseContext.Provider
          value={{ state: exerciseState, dispatch: exerciseDispatch }}
        >
          <Route exact path="/plans" component={Plans} />
          <Route exact path="/progress" component={CreatePlan} />
          <Route exact path="/create-plan" component={CreatePlan} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/history" component={History} />
          <Route path="/plans/:plan_id" component={PlanHOC} />
        </ExerciseContext.Provider>
        <Route exact path="/logout" component={Logout} />
      </main>
    </NavContext.Provider>
  );
}

export default App;
