import React, { lazy, useState, Suspense } from "react";

import SetLoading from "../SetLoading";
const MobileFilter = lazy(() => import("./Mobile/MobileFilter"));
const WebFilter = lazy(() => import("./Web/WebFilter"));

const PlanFilter = ({
  isMobile,
  nameFilter,
  goalFilter,
  weekFilter,
  authorFilter,
  setWeekFilter,
  setNameFilter,
  setGoalFilter,
  setAuthorFilter
}) => {
  const [showFilters, setShowFilters] = useState(false);
  function onInputChange(e, index) {
    const {
      target: { value }
    } = e;

    if (value < 0 || value > 50 || value % 1 !== 0) return;

    if (index) {
      if (value < weekFilter[0]) return;
    } else {
      if (value > weekFilter[1]) return;
    }

    let newWeekFilter = weekFilter.concat();
    newWeekFilter[index] = value;
    setWeekFilter(newWeekFilter);
  }

  function onGoalChange(index) {
    let newGoalFilter = goalFilter.concat();
    newGoalFilter[index] = !goalFilter[index];
    setGoalFilter(newGoalFilter);
  }

  let view;

  if (isMobile) {
    view = <MobileFilter />;
  } else {
    view = <WebFilter />;
  }

  return <Suspense fallback={<SetLoading />}>{view}</Suspense>;
};

export default PlanFilter;

// let woPlansToDisplay = woPlans;

// if (nameFilter.length) {
//   let regex = RegExp(nameFilter, "i");
//   woPlansToDisplay = woPlans.filter(x => regex.test(x.name));
// }

// if (authorFilter.length) {
//   let regex = RegExp(authorFilter, "i");
//   woPlansToDisplay = woPlans.filter(x => regex.test(x.user.username));
// }

// if (weekFilter[0] > 0 || weekFilter[1] < 50) {
//   woPlansToDisplay = woPlans.filter(x => {
//     const { length } = x.weeks;

//     return length >= weekFilter[0] && length <= weekFilter[1];
//   });
// }

// if (goalFilter.includes(true)) {
//   let filter = [];
//   if (goalFilter[0]) {
//     filter.push("Gain strength");
//   }
//   if (goalFilter[1]) {
//     filter.push("Gain mass");
//   }
//   if (goalFilter[2]) {
//     filter.push("Lose fat");
//   }

//   woPlansToDisplay = woPlans.filter(
//     x => x.goals.map(x => x.goal).filter(x => filter.indexOf(x) > -1).length
//   );
// }
