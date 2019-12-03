import React from "react";
import { Route, useParams, Switch } from "react-router-dom";
import { PlanContext } from "../context/planContext";

import usePlan from "../hooks/usePlan";

import Plan from "./Plan/Plan";
import EditWeek from "./EditWeek/EditWeek";
import Overview from "./Plan/PlanOverview";
import PlanEdit from "./Plan/PlanEdit";
import useSetLoading from "../hooks/useSetLoading";

const PlanHOC = () => {
  const { plan_id: planId } = useParams();
  const { state, dispatch } = usePlan(planId);
  const { woPlan, isPending, isRejected, error } = state;

  if (isPending) {
    return null;
  }

  if (isRejected) {
    return <ErrorMessage error={error} />;
  }

  if (!woPlan) {
    return <p>Oh noes</p>;
  }

  return (
    <PlanContext.Provider value={{ state, dispatch }}>
      <Switch>
        <Route exact path="/plans/:plan_id" component={Plan} />
        <Route exact path="/plans/:plan_id/edit" component={PlanEdit} />
        <Route exact path="/plans/:plan_id/overview" component={Overview} />
        <Route exact path="/plans/:plan_id/:week_id" component={EditWeek} />
      </Switch>
    </PlanContext.Provider>
  );
};

const ErrorMessage = ({ error }) => {
  useSetLoading(false);
  return <p className="text-center padding-10 ">{error}</p>;
};
export default PlanHOC;
