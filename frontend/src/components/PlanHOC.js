import React from "react";
import { Route, withRouter } from "react-router-dom";
import { PlanContext } from "../context/planContext";
import Loading from "./shared/SVGs/Loading";

import usePlan from "../hooks/usePlan";
import useSetLoading from "../hooks/useSetLoading";

import Plan from "./Plan/Plan";
import EditWeek from "./EditWeek/EditWeek";

const PlanHOC = props => {
  const {
    location: { pathname }
  } = props;

  let planId = pathname.split("/")[2];
  const { state, dispatch } = usePlan(planId);

  const { woPlan, isPending, isRejected } = state;

  useSetLoading(isPending);

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

export default withRouter(PlanHOC);
