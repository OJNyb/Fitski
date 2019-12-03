import React, { useState } from "react";
import useSetLoading from "../../../hooks/useSetLoading";

import Search from "../../shared/SVGs/SearchThick";
import useNavRedDehaze from "../../../hooks/useNavRedDehaze";
import MobileNavMidContainer from "../../shared/NavMid/MobileNavMidContainer";
import PlanCard from "../../shared/PlanCard/MobilePlanCard";

import "./mobileExplore.css";

const MobileExplore = ({
  plans,
  search,
  onSearchChange,
  handleActivateClick,
  handleDeactivateClick
}) => {
  useSetLoading(false);
  useNavRedDehaze();
  const [showSearch, setShowSearch] = useState(false);

  console.log(plans);

  let view;
  if (plans.length) {
    let cards = plans.map(plan => (
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
  }

  return (
    <>
      <MobileNavMidContainer
        children={
          (showSearch && (
            <div className="flex-ai-center explore-mobile-search-container">
              <input value={search} onChange={onSearchChange} />
              <Search stroke={"#a60000"} />
            </div>
          )) || (
            <>
              <h2 className="margin-0 font-w-500 mb-2 font-18 color-white">
                Explore
              </h2>
              <button
                to="/create-plan"
                onClick={() => setShowSearch(true)}
                className="padding-5 flex-ai-center border-box"
              >
                <Search stroke={"#fff"} />
              </button>
            </>
          )
        }
      />

      <div className="mobile-nav-icon-container"></div>

      {view}
    </>
  );
};

export default MobileExplore;
