import React, { useRef, useEffect, useState } from "react";
import useSetLoading from "../../../hooks/useSetLoading";

import SearchThick from "../../shared/SVGs/SearchThick";
import Search from "../../shared/SVGs/Search";

// import FilterSVG from "../../shared/SVGs/Filter";
// import Filter from "./MobileFilter";

import useNavDehaze from "../../../hooks/useNavDehaze";
import MobileNavMidContainer from "../../shared/NavMid/MobileNavMidContainer";
import PlanCard from "../../shared/PlanCard/MobilePlanCard";
import UserCard from "./MobileUserCard";

import "./mobileExplore.css";

const MobileExplore = ({
  search,
  noMatch,
  results,
  category,
  reachedEnd,
  onSearchChange,
  handlePlanClick,
  handlePeopleClick,
  handleActivateClick,
  handleDeactivateClick
}) => {
  useSetLoading(false);
  useNavDehaze();
  const [showSearch, setShowSearch] = useState(false);

  let view;

  if (noMatch) {
    view = <p className="text-center black">No results</p>;
  } else if (category === "plans") {
    if (results.length) {
      let cards = results.map(plan => (
        <PlanCard
          plan={plan}
          key={plan._id}
          search={search}
          category={category}
          onActivateClick={handleActivateClick}
          onDeactivateClick={handleDeactivateClick}
        />
      ));
      view = cards;
    }
  } else {
    if (results.length) {
      let cards = results.map(user => (
        <UserCard
          user={user}
          key={user._id}
          search={search}
          category={category}
        />
      ));
      view = cards;
    } else if (search === "") {
      view = <p className="text-center black">Search for someone</p>;
    }
  }

  return (
    <>
      <MobileNavMidContainer
        children={
          (showSearch && (
            <SearchForm
              search={search}
              onChange={onSearchChange}
              setShowSearch={setShowSearch}
            />
          )) || (
            <div
              className="flex-center-space-bw width-100p"
              onClick={() => setShowSearch(true)}
            >
              <h2 className="margin-0 font-w-500 mb-2 font-18 color-white">
                {search.length ? search : "Explore"}
              </h2>
              <div className="flex-ai-center">
                {/* <button onClick={() => setShowFilter(true)}>
                  <FilterSVG stroke={"#fff"} fill={"#a60000"} />
                </button> */}

                <button className="padding-5 flex-ai-center border-box">
                  <SearchThick stroke={"#fff"} />
                </button>
              </div>
            </div>
          )
        }
      />
      <div className="pt-50">
        <ExploreCategoryNav
          category={category}
          onPlanClick={handlePlanClick}
          onPeopleClick={handlePeopleClick}
        />
        <div className="explore-mobile-cards-container">{view}</div>
        {reachedEnd && !!results.length && (
          <p className="text-center color-light-gray">You've reached the end</p>
        )}
      </div>
    </>
  );
};

const SearchForm = ({ search, onChange, setShowSearch }) => {
  const input = useRef(null);

  useEffect(() => {
    input.current.focus();
  }, []);
  return (
    <div className="flex-ai-center explore-mobile-search-container">
      <input
        ref={input}
        value={search}
        onChange={onChange}
        onBlur={() => setShowSearch(false)}
        placeholder="Search Chadify"
      />
      <Search stroke={"#a60000"} />
    </div>
  );
};

const ExploreCategoryNav = ({ category, onPlanClick, onPeopleClick }) => {
  return (
    <div className="width-100p flex-ai-center explore-category-nav-container">
      <button
        className={
          category === "plans"
            ? "explore-category-nav-active tc"
            : "color-gray mb-2"
        }
        onClick={onPlanClick}
      >
        Plans
      </button>
      <button
        className={
          category === "people"
            ? "explore-category-nav-active tc"
            : "color-gray mb-2"
        }
        onClick={onPeopleClick}
      >
        People
      </button>
    </div>
  );
};

export default MobileExplore;
