import React from "react";
import useSetLoading from "../../../hooks/useSetLoading";

import WebUserCard from "./WebUserCard";
import ExploreNav from "./WebExploreNav";
import WorkoutPlans from "../../shared/PlanCard/WebWorkoutPlans";

import "./webExplore.css";

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
      <ExploreNav
        search={search}
        isMobile={false}
        category={category}
        onPlanClick={handlePlanClick}
        onPeopleClick={handlePeopleClick}
        onSearchChange={onSearchChange}
      />
      <div className="pb-50">
        {cards}
        {reachedEnd && !!results.length && (
          <p className="color-light-gray text-center">
            You've reached the end...
          </p>
        )}
      </div>
    </>
  );
};

export default Explore;
