import React from "react";
import { Link } from "react-router-dom";
import useSetLoading from "../../../hooks/useSetLoading";

import Plus20 from "../../shared/SVGs/Plus20";
import Search from "../../shared/SVGs/SearchThick";
import useNavDehaze from "../../../hooks/useNavDehaze";
import MobileNavMidContainer from "../../shared/NavMid/MobileNavMidContainer";
import PlanCard from "../../shared/PlanCard/MobilePlanCard";
import MobileEmpty from "../../shared/MobileEmpty";

const PlansMobile = ({
  woPlans,
  isPending,
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
      <div className="plans-cards-container pt-50 width-100p">{cards}</div>
    );
  } else if (!isPending) {
    view = <NoPlans />;
  }

  return (
    <>
      <MobileNavMidContainer
        children={
          <>
            <h2 className="nav-h2 color-white">Plans</h2>
            <Link
              to="/create-plan"
              className="padding-5 flex-ai-center border-box"
            >
              {/* TODO */}
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
    <MobileEmpty
      text={"You don't have any workout plans"}
      children={[
        {
          text: "Find A Workout Plan",
          icon: <Search stroke={"#a60000"} />,
          to: "/discover"
        },
        {
          text: "Create Workout Plan",
          icon: <Plus20 fill={"#a60000"} />,
          to: "/create-plan"
        }
      ]}
    />
  );
};

export default PlansMobile;
