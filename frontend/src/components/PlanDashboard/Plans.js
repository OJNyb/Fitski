import React, { useState, useContext, useLayoutEffect } from "react";
import usePlans from "../../hooks/usePlans";
import useMobile from "../../hooks/useMobile";
import useSetLoading from "../../hooks/useSetLoading";
import { NavContext } from "../../context/navContext";
import { SINGLE_NAV, IS_WHITE } from "../../types/navTypes";

import PlansNav from "./PlansNav";
import PlanCard from "./PlanCard";

import "./plans.css";
import PlanFilter from "./PlanFilter";
import MobilePlanCard from "./MobileCard";

const Plans = () => {
  const { state, dispatch } = usePlans();
  const isMobile = useMobile();
  const [nameFilter, setNameFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [weekFilter, setWeekFilter] = useState([0, 50]);
  const [goalFilter, setGoalFilter] = useState([false, false, false]);

  const { dispatch: navDispatch } = useContext(NavContext);
  const { isPending, isRejected, woPlans } = state;

  useSetLoading(isPending);

  useLayoutEffect(() => {
    function setNavWhite() {
      navDispatch({ type: IS_WHITE });
      navDispatch({ type: SINGLE_NAV });
    }

    setNavWhite();
  }, []);

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

  let cards;

  if (!isMobile) {
    cards = woPlansToDisplay.map(plan => (
      <PlanCard key={plan._id} plan={plan} isMobile={isMobile} />
    ));
  } else {
    cards = woPlansToDisplay.map(plan => (
      <MobilePlanCard key={plan._id} plan={plan} />
    ));
  }

  return (
    <>
      <PlansNav isMobile={isMobile} dispatch={dispatch} />

      <PlanFilter
        isMobile={isMobile}
        nameFilter={nameFilter}
        weekFilter={weekFilter}
        goalFilter={goalFilter}
        authorFilter={authorFilter}
        setNameFilter={setNameFilter}
        setWeekFilter={setWeekFilter}
        setGoalFilter={setGoalFilter}
        setAuthorFilter={setAuthorFilter}
      />

      <div
        className={
          "plans-cards-container" +
          (isMobile ? " plans-cards-container-mobile" : "")
        }
      >
        {!isMobile && (
          <div className="plans-cards-header">
            <div className="plans-cards-header-name">Name</div>
            <div className="plans-cards-header-goal">Goal</div>
            <div className="plans-cards-header-author">Author</div>
            <div className="plans-cards-header-length">Length</div>
            {!isMobile && (
              <div className="plans-cards-header-created">Created</div>
            )}
          </div>
        )}
        {cards}
      </div>
    </>
  );
};

export default Plans;
