import React from "react";
import { Route, withRouter } from "react-router-dom";
import { PlanContext } from "../../context/planContext";
import { ExerciseContext } from "../../context/exerciseContext";

import usePlan from "../../hooks/usePlan";
import useExercises from "../../hooks/useExercises";

import Plan from "./Plan";
import EditWeek from "./EditWeek/EditWeek";

const PlanHOC = props => {
  const {
    location: { pathname }
  } = props;

  let planId = pathname.split("/")[2];
  const { state, dispatch } = usePlan(planId);
  const { state: exerciseState, dispatch: exerciseDispatch } = useExercises();

  const { woPlan, isPending, isRejected } = state;

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isRejected) {
    return <p>Error... Check console.</p>;
  }

  if (!woPlan) {
    return <p>Oh noes</p>;
  }

  return (
    <PlanContext.Provider value={{ state, dispatch }}>
      <ExerciseContext.Provider value={{ exerciseState, exerciseDispatch }}>
        <Route exact path="/plans/:plan_id" component={Plan} />
        <Route exact path="/plans/:plan_id/:week_id" component={EditWeek} />
      </ExerciseContext.Provider>
    </PlanContext.Provider>
  );
};

export default withRouter(PlanHOC);
