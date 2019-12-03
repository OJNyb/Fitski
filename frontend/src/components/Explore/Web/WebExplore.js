import React from "react";
import useSetLoading from "../../../hooks/useSetLoading";

import ExploreNav from "./WebExploreNav";
import WorkoutPlans from "../../shared/PlanCard/WebWorkoutPlans";

import "./webExplore.css";

const Explore = ({ plans, search, onSearchChange }) => {
  useSetLoading(false);
  console.log(plans);
  return (
    <>
      <ExploreNav
        isMobile={false}
        search={search}
        onSearchChange={onSearchChange}
      />
      <WorkoutPlans woPlans={plans} />
    </>
  );
};

export default Explore;
