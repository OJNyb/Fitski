import React, { useState } from "react";
import usePlans from "../../hooks/usePlans";
import useMobile from "../../hooks/useMobile";
import useSetLoading from "../../hooks/useSetLoading";

import PlansNav from "./PlansNav";
import PlanCard from "./PlanCard";

import "./plans.css";
import PlanFilter from "./PlanFilter";

const Plans = () => {
  const { state, dispatch } = usePlans();
  const isMobile = useMobile();
  const [nameFilter, setNameFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [weekFilter, setWeekFilter] = useState([0, 50]);
  const [goalFilter, setGoalFilter] = useState([false, false, false]);

  const { isPending, isRejected, woPlans } = state;

  useSetLoading(isPending);

  if (isPending) return null;
  if (isRejected) return <p>Derp</p>;
  if (!woPlans) {
    return <p>Derp...</p>;
  }

  let woPlansToDisplay = woPlans;

  if (nameFilter.length) {
    let regex = RegExp(nameFilter, "i");
    woPlansToDisplay = woPlans.filter(x => regex.test(x.name));
  }

  if (authorFilter.length) {
    let regex = RegExp(authorFilter, "i");
    woPlansToDisplay = woPlans.filter(x => regex.test(x.user.username));
  }

  if (weekFilter[0] > 0 || weekFilter[1] < 50) {
    woPlansToDisplay = woPlans.filter(x => {
      const { length } = x.weeks;

      return length >= weekFilter[0] && length <= weekFilter[1];
    });
  }

  if (goalFilter.includes(true)) {
    let filter = [];
    if (goalFilter[0]) {
      filter.push("Gain strength");
    }
    if (goalFilter[1]) {
      filter.push("Gain mass");
    }
    if (goalFilter[2]) {
      filter.push("Lose fat");
    }

    woPlansToDisplay = woPlans.filter(
      x => x.goals.map(x => x.goal).filter(x => filter.indexOf(x) > -1).length
    );
  }

  let cards = woPlansToDisplay.map(plan => (
    <PlanCard key={plan._id} plan={plan} isMobile={isMobile} />
  ));

  return (
    <>
      <PlansNav dispatch={dispatch} />

      <PlanFilter
        nameFilter={nameFilter}
        weekFilter={weekFilter}
        goalFilter={goalFilter}
        authorFilter={authorFilter}
        setNameFilter={setNameFilter}
        setWeekFilter={setWeekFilter}
        setGoalFilter={setGoalFilter}
        setAuthorFilter={setAuthorFilter}
      />

      <div className="plans-cards-container">
        <div className="plans-cards-header">
          <div className="plans-cards-header-name">Name</div>
          <div className="plans-cards-header-author">Author</div>
          <div className="plans-cards-header-length">Length</div>
          <div className="plans-cards-header-goal">Goal</div>
          {!isMobile && (
            <div className="plans-cards-header-created">Created</div>
          )}
        </div>
        {cards}
      </div>
    </>
  );
};

export default Plans;
