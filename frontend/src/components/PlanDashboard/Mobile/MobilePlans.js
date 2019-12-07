import React from "react";
import { Link } from "react-router-dom";
import useSetLoading from "../../../hooks/useSetLoading";

import Plus20 from "../../shared/SVGs/Plus20";
import useNavDehaze from "../../../hooks/useNavDehaze";
import MobileNavMidContainer from "../../shared/NavMid/MobileNavMidContainer";
import PlanCard from "../../shared/PlanCard/MobilePlanCard";

const PlansMobile = ({
  woPlans,
  handleActivateClick,
  handleDeactivateClick
}) => {
  useSetLoading(false);
  useNavDehaze();

  let view;
  if (woPlans.length) {
    let cards = woPlans.map(plan => (
      <PlanCard
        key={plan._id}
        plan={plan}
        onActivateClick={handleActivateClick}
        onDeactivateClick={handleDeactivateClick}
      />
    ));
    view = (
      <div className="plans-cards-container plans-cards-container-mobile">
        {cards}
      </div>
    );
  } else {
    view = <NoPlans />;
  }

  return (
    <>
      <MobileNavMidContainer
        children={
          <>
            <h2 className="margin-0 font-w-500 mb-2 font-18 color-white">
              Plans
            </h2>
            <Link
              to="/create-plan"
              className="padding-5 flex-ai-center border-box"
            >
              <Plus20 fill={"#fff"} />
            </Link>
          </>
        }
      />

      <div className="mobile-nav-icon-container"></div>

      {view}
    </>
  );
};

const NoPlans = () => {
  return (
    <div className="flex-col-cen fixed width-100p plan-mobile-empty-plan-container">
      <span className="color-gray">
        Looks like you don't have any workout plans
      </span>
      <div className="flex-col-cen">
        <Link to="/create-plan">
          <Plus20 fill={"#a60000"} />
        </Link>
        <span className="color-light-gray font-14 margin-5">
          Create Workout Plan
        </span>
      </div>
    </div>
  );
};

export default PlansMobile;
