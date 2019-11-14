import React from "react";
import useSetLoading from "../../../hooks/useSetLoading";

import PlansNav from "./PlansNav";
import PlanCard from "./PlanCard";

const Plans = ({ woPlans, dispatch }) => {
  useSetLoading(false);

  let cards = woPlans.map(plan => <PlanCard key={plan._id} plan={plan} />);

  return (
    <>
      <PlansNav isMobile={false} dispatch={dispatch} />

      <div className="plans-cards-container">
        <div className="plans-cards-header">
          <div className="plans-cards-header-name">Name</div>
          <div className="plans-cards-header-goal">Goal</div>
          <div className="plans-cards-header-author">Author</div>
          <div className="plans-cards-header-length">Length</div>

          <div className="plans-cards-header-created">Created</div>
        </div>
        {cards}
      </div>
    </>
  );
};

export default Plans;
