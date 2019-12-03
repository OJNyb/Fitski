import React from "react";
import useSetLoading from "../../../hooks/useSetLoading";

import PlansNav from "./PlansNav";
import WorkoutPlans from "../../shared/PlanCard/WebWorkoutPlans";

const Plans = ({ woPlans, dispatch }) => {
  useSetLoading(false);

  return (
    <>
      <PlansNav isMobile={false} dispatch={dispatch} />
      <WorkoutPlans woPlans={woPlans} />
    </>
  );
};

export default Plans;
