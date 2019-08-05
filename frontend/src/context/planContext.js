import React from "react";
import { withRouter } from "react-router-dom";
import usePlan from "../hooks/usePlan";

const PlanContext = React.createContext();

function PlanProvider(props) {
  const {
    location: { pathname }
  } = props;

  let planId = pathname.split("/")[2];
  const { state, dispatch } = usePlan(planId);

  return <PlanContext.Provider value={{ state, dispatch }} {...props} />;
}

function useWOPlan() {
  const context = React.useContext(PlanContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a PlanProvider`);
  }
  return context;
}

PlanProvider = withRouter(PlanProvider);

export { PlanProvider, useWOPlan };
