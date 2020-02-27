import React from "react";
import { Link } from "react-router-dom";
import useSetLoading from "../../../hooks/useSetLoading";

import Plus20 from "../../shared/SVGs/Plus20";
import Plus22 from "../../shared/SVGs/Plus22";
import Search from "../../shared/SVGs/SearchThick";
import useSetNav from "../../../hooks/useSetNav";
import PlanCard from "../../shared/PlanCard/MobilePlanCard";
import MobileEmpty from "../../shared/MobileEmpty";

const PlansMobile = ({
  woPlans,
  isPending,
  handleActivateClick,
  handleDeactivateClick
}) => {
  useSetLoading(false);
  useSetNav({
    showDehaze: true,
    text: "Plans",
    buttonId: "plan1",
    buttons: (
      <Link to="/create-plan" className="padding-5 flex-ai-center border-box">
        <Plus22 fill={"#fff"} />
      </Link>
    )
  });

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

  return <>{view}</>;
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
