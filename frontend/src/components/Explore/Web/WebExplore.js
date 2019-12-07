import React from "react";
import useSetLoading from "../../../hooks/useSetLoading";

import ExploreNav from "./WebExploreNav";
import WorkoutPlans from "../../shared/PlanCard/WebWorkoutPlans";

import "./webExplore.css";

const Explore = ({ plans, search, reachedEnd, onSearchChange }) => {
  useSetLoading(false);
  return (
    <>
      <ExploreNav
        isMobile={false}
        search={search}
        onSearchChange={onSearchChange}
      />
      <WorkoutPlans woPlans={plans} search={search} />
      {reachedEnd && <p>You've reached the end...</p>}
    </>
  );
};

export default Explore;
