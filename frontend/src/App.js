import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import CreatePlan from "./components/CreatePlan/CreatePlan.js";
import Navigation from "./components/Navigation";
import Overview from "./components/Plan/Overview";
import EditWeek from "./components/EditWeek/EditWeek";

import "./App.css";
import "./styles/common.css";

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <main>
          <Route path="/create-plan" component={CreatePlan} />
          <Route exact path="/plans/:plan_id" component={Overview} />
          <Route exact path="/plans/:plan_id/:week_id" component={EditWeek} />
        </main>
      </Router>
    </>
  );
}

export default App;
