import React from "react";

import PlanCard from "./WebPlanCard";
import LoadingSpinner from "../SVGs/LoadingSpinner";
import "./webPlanCard.css";

const WorkoutPlans = ({ woPlans, profile, search, category, isPending }) => {
  let cardView;
  if (woPlans.length) {
    cardView = woPlans.map(plan => (
      <PlanCard
        key={plan._id}
        plan={plan}
        profile={profile}
        search={search}
        category={category}
      />
    ));
  } else if (!isPending) {
    return <p className="text-center color-gray">No workout plans</p>;
  }

  return (
    <div className="plans-web-container border-box">
      <div className="plans-cards-header flex-center-space-bw">
        <div className="plans-cards-header-name">Name</div>
        <div className="plans-cards-header-goal">Goal</div>
        <div className="plans-cards-header-author">Author</div>
        <div className="plans-cards-header-length">Length</div>
        <div className="plans-cards-header-created">Created</div>
      </div>
      {cardView}
      {isPending && (
        <div className="flex-center web-plan-card-spinner-container">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default WorkoutPlans;
