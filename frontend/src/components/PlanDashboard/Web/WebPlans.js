import React from "react";
import useSetLoading from "../../../hooks/useSetLoading";

import PlansNav from "./PlansNav";
import WorkoutPlans from "../../shared/PlanCard/WebWorkoutPlans";

const Plans = ({ woPlans, dispatch, isPending }) => {
  useSetLoading(false);

  return (
    <div className="pb-50">
      <PlansNav isMobile={false} dispatch={dispatch} />
      <WorkoutPlans woPlans={woPlans} isPending={isPending} />
    </div>
  );
};

export default Plans;
