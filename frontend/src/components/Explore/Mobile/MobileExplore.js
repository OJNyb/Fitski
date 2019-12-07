import React, { useState } from "react";
import useSetLoading from "../../../hooks/useSetLoading";

import Search from "../../shared/SVGs/SearchThick";
import FilterSVG from "../../shared/SVGs/Filter";
import Filter from "./MobileFilter";

import useNavDehaze from "../../../hooks/useNavDehaze";
import MobileNavMidContainer from "../../shared/NavMid/MobileNavMidContainer";
import PlanCard from "../../shared/PlanCard/MobilePlanCard";

import "./mobileExplore.css";

const MobileExplore = ({
  plans,
  search,
  filter,
  setFilter,
  onSearchChange,
  handleActivateClick,
  handleDeactivateClick
}) => {
  useSetLoading(false);
  useNavDehaze();
  const [showFilter, setShowFilter] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  let view;
  if (plans.length) {
    let cards = plans.map(plan => (
      <PlanCard
        plan={plan}
        key={plan._id}
        search={search}
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
              <div className="flex-ai-center">
                <button onClick={() => setShowFilter(true)}>
                  <FilterSVG stroke={"#fff"} fill={"#a60000"} />
                </button>

                <button
                  onClick={() => setShowSearch(true)}
                  className="padding-5 flex-ai-center border-box"
                >
                  <Search stroke={"#fff"} />
                </button>
              </div>
            </>
          )
        }
      />

      {showFilter && <Filter filter={filter} setFilter={setFilter} />}

      <div className="mobile-nav-icon-container"></div>

      {view}
    </>
  );
};

export default MobileExplore;
