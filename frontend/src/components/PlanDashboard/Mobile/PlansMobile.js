import React from "react";
import { Link } from "react-router-dom";
import useSetLoading from "../../../hooks/useSetLoading";

import Plus20 from "../../shared/SVGs/Plus20";
import MobilePlanCard from "./MobileCard";
import useNavRedDehaze from "../../../hooks/useNavRedDehaze";

const PlansMobile = ({ woPlans }) => {
  useSetLoading(false);
  useNavRedDehaze();

  console.log(woPlans.length);
  let view;
  if (woPlans.length) {
    let cards = woPlans.map(plan => (
      <MobilePlanCard key={plan._id} plan={plan} />
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
      <div className="mobile-nav-icon-container">
        <Link to="/create-plan" className="padding-5 flex-ai-center border-box">
          <Plus20 fill={"#fff"} />
        </Link>
      </div>

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
