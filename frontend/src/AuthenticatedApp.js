import React from "react";
import { Route } from "react-router-dom";

import CreatePlan from "./components/CreatePlan/CreatePlan.js";
import Navigation from "./components/Navigation";
import Plans from "./components/PlanDashboard/Plans";
import PlanHOC from "./components/PlanHOC";
import Logout from "./components/Logout";
import History from "./components/History/History";
import Settings from "./components/Settings/Settings";

import { ExerciseContext } from "./context/exerciseContext";
import useExercises from "./hooks/useExercises";

import "./App.css";
import "./styles/common.css";

function App() {
  const { state: exerciseState, dispatch: exerciseDispatch } = useExercises();

  return (
    <>
      <Navigation />
      <main>
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
    </>
  );
}

export default App;
