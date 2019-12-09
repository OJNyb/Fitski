import React from "react";
import useSetLoading from "../../../hooks/useSetLoading";

import ExploreNav from "./WebExploreNav";
import WorkoutPlans from "../../shared/PlanCard/WebWorkoutPlans";

import "./webExplore.css";

const Explore = ({ results, search, category, reachedEnd, onSearchChange }) => {
  useSetLoading(false);

  return (
    <>
      <ExploreNav
        isMobile={false}
        search={search}
        onSearchChange={onSearchChange}
      />
      <div className="pb-50">
        <WorkoutPlans woPlans={results} search={search} category={category} />
        {reachedEnd && (
          <p className="color-light-gray text-center">
            You've reached the end...
          </p>
        )}
      </div>
    </>
  );
};

export default Explore;
