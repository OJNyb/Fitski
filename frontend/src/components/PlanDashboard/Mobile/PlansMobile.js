import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSetLoading from "../../../hooks/useSetLoading";
import ActivatePlanModal from "../../Plan/ActivatePlanModal";

import Plus20 from "../../shared/SVGs/Plus20";
import MobilePlanCard from "./MobileCard";
import useNavRedDehaze from "../../../hooks/useNavRedDehaze";
import MobileNavMidContainer from "../../shared/NavMid/MobileNavMidContainer";

const PlansMobile = ({ woPlans }) => {
  useSetLoading(false);
  useNavRedDehaze();
  const [showModal, setShowModal] = useState(false);

  function handleActivateClick(e, planId) {
    console.log(e);
    e.preventDefault();
    setShowModal(planId);
  }

  let view;
  if (woPlans.length) {
    let cards = woPlans.map(plan => (
      <MobilePlanCard
        key={plan._id}
        plan={plan}
        onActivateClick={handleActivateClick}
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

  let modal = null;
  if (showModal) {
    modal = (
      <ActivatePlanModal
        planId={showModal}
        hideModal={() => setShowModal(false)}
      />
    );
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

      {modal}
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
