import React from "react";
import { Route } from "react-router-dom";

import CreatePlan from "./components/Plan/CreatePlan/CreatePlan.js";
import Navigation from "./components/Navigation";
import Plans from "./components/Plans";
import PlanHOC from "./components/Plan/PlanHOC";

import "./App.css";
import "./styles/common.css";

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Route exact path="/create-plan" component={CreatePlan} />
        <Route exact path="/plans" component={Plans} />
        <Route path="/plans/:plan_id" component={PlanHOC} />
        {/* <PlanProvider>
          <Route exact path="/plans/:plan_id" component={Plan} />
          <Route exact path="/plans/:plan_id/:week_id" component={EditWeek} />
        </PlanProvider> */}
      </main>
    </>
  );
}

export default App;
