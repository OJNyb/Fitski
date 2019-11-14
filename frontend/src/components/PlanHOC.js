import React from "react";
import { Route, useParams } from "react-router-dom";
import { PlanContext } from "../context/planContext";

import usePlan from "../hooks/usePlan";

import Plan from "./Plan/Plan";
import EditWeek from "./EditWeek/EditWeek";

const PlanHOC = () => {
  const { plan_id: planId } = useParams();
  const { state, dispatch } = usePlan(planId);
  const { woPlan, isPending, isRejected } = state;

  if (isPending) {
    return null;
  }

  if (isRejected) {
    return <p>Error... Check console.</p>;
  }

  if (!woPlan) {
    return <p>Oh noes</p>;
  }

  return (
    <PlanContext.Provider value={{ state, dispatch }}>
      <Route exact path="/plans/:plan_id" component={Plan} />
      <Route exact path="/plans/:plan_id/:week_id" component={EditWeek} />
    </PlanContext.Provider>
  );
};

export default PlanHOC;
