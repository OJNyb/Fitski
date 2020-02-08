import React from "react";
import useSetLoading from "../../../hooks/useSetLoading";

import WebUserCard from "./WebUserCard";
import ExploreNav from "./WebExploreNav";
import WorkoutPlans from "../../shared/PlanCard/WebWorkoutPlans";
import {
  MainContainer,
  MainTile,
  SecondTile,
  MainTileNav
} from "../../shared/Layout";

import "./webExplore.css";
import Search from "../../shared/SVGs/Search";

const Explore = ({
  search,
  results,
  category,
  reachedEnd,
  onSearchChange,
  handlePlanClick,
  handlePeopleClick
}) => {
  useSetLoading(false);

  let cards;
  if (category === "plans") {
    cards = (
      <WorkoutPlans woPlans={results} search={search} category={category} />
    );
  } else {
    let pCards = results.map(x => (
      <WebUserCard key={x._id} user={x} category={category} search={search} />
    ));
    cards = <div className="explore-web-profile-cards-container">{pCards}</div>;
  }

  return (
    <>
      <MainContainer>
        <MainTile>
          <MainTileNav>
            {/* <ExploreNav
              search={search}
              isMobile={false}
              category={category}
              onPlanClick={handlePlanClick}
              onPeopleClick={handlePeopleClick}
              onSearchChange={onSearchChange}
            /> */}
            <div className="explore-web-nav-container flex-center">
              <div className="explore-web-search-container flex-center-space-bw">
                <input value={search} onChange={onSearchChange} />
                <Search />
              </div>
            </div>
            <div className="explore-web-category-container">
              <button
                className={
                  category === "plans" ? "explore-web-category-btn-active" : ""
                }
                onClick={handlePlanClick}
              >
                Plans
              </button>
              <button
                className={
                  category === "people" ? "explore-web-category-btn-active" : ""
                }
                onClick={handlePeopleClick}
              >
                People
              </button>
            </div>
          </MainTileNav>
          <div className="pb-50">
            {cards}
            {reachedEnd && !!results.length && (
              <p className="color-light-gray text-center">
                You've reached the end...
              </p>
            )}
          </div>
        </MainTile>
        <SecondTile>
          {/* <ul>
            <li>Hmm</li>
          </ul> */}
        </SecondTile>
      </MainContainer>
    </>
  );
};

export default Explore;
