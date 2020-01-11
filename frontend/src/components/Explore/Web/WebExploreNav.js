import React from "react";
import NavMid from "../../shared/NavMid/NavMid";
import SearchThick from "../../shared/SVGs/SearchThick";

const ExploreNav = ({
  search,
  category,
  onPlanClick,
  onPeopleClick,
  onSearchChange
}) => {
  return (
    <NavMid
      backText={"Explore"}
      midContent={
        <div className="flex-col-cen">
          <div className="flex-center">
            <button
              className={
                "explore-web-search-category-button" +
                (category === "plans"
                  ? " explore-web-search-category-button-active"
                  : "")
              }
              onClick={onPlanClick}
            >
              Plans
            </button>
            <button
              className={
                "explore-web-search-category-button" +
                (category === "people"
                  ? " explore-web-search-category-button-active"
                  : "")
              }
              onClick={onPeopleClick}
            >
              People
            </button>
          </div>
          <label className="flex-ai-center explore-web-search-container">
            <input value={search} onChange={onSearchChange} />
            <SearchThick stroke={null} />
          </label>
        </div>
      }
    />
  );
};

export default ExploreNav;
