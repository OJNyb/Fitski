import React from "react";
import { Route } from "react-router-dom";

import { PlanProvider } from "./context/planContext";

import CreatePlan from "./components/CreatePlan/CreatePlan.js";
import Navigation from "./components/Navigation";
import Overview from "./components/Plan/Overview";
import EditWeek from "./components/EditWeek/EditWeek";

import "./App.css";
import "./styles/common.css";

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Route path="/create-plan" component={CreatePlan} />
        <PlanProvider>
          <Route exact path="/plans/:plan_id" component={Overview} />
          <Route exact path="/plans/:plan_id/:week_id" component={EditWeek} />
        </PlanProvider>
      </main>
    </>
  );
}

export default App;
