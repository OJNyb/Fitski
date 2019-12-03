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

/* Plan filter */

// .plans-filter-button {
//   margin: 20px auto 5px;

//   padding: 2px 8px;
//   font-weight: 500;
//   font-size: 12px;
//   color: gray;
// }
// .plans-filter-container {
//   display: flex;
//   position: relative;
//   justify-content: space-around;
//   background-color: #fff;
//   border-radius: 2px;
//   box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.11);
//   max-width: 60%;
//   max-height: 0;
//   overflow: hidden;
//   padding: 0;
//   transition: all 0.2s;
//   margin: 0 auto;
// }

// .plans-filter-container-show {
//   max-height: 455px;
//   padding: 10px 0;
//   border: 1px solid rgb(231, 219, 219);
// }

// .plans-filter-category-header {
//   color: rgb(65, 51, 51);
//   margin: 0;
//   font-size: 11px;
//   font-weight: 500;
// }

// .plans-name-filter-container input,
// .plans-author-filter-container input {
//   width: 100px;
//   background-color: inherit;
//   border: 1px solid #f3e2e2;
//   padding: 3px 5px 2px 5px;
//   outline-color: #995454;
// }

// .plans-name-filter-container,
// .plans-author-filter-container {
//   margin-top: 13px;
// }

// .plans-length-filter-container {
//   width: 200px;
//   color: rgba(0, 0, 0, 0.6);
//   font-size: 12px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// }

// .plans-filter-length-bar {
//   height: 2px;
//   width: 80%;
//   margin: 17px 0 15px;
// }

// .plans-filter-render-thumb {
//   height: 13px;
//   width: 13px;
//   background-color: rgb(129, 58, 58);
//   border-radius: 50%;
// }

// .plans-filter-length-input-container {
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .plans-filter-length-seperator {
//   height: 0.9px;
//   width: 10px;
//   margin: 0 10px;
//   background-color: rgb(201, 160, 160);
// }

// .plans-filter-length-input-container input {
//   width: 20px;
//   height: 20px;
//   text-align: center;
//   border: 0;
//   outline: none;
//   padding: 0;
// }

// .plans-filter-length-input-wrapper {
//   display: flex;
//   align-content: center;
//   justify-content: center;
//   width: 40px;
//   text-align: center;
//   border: 1px solid rgb(240, 227, 227);
//   background-color: #fff;
//   border-radius: 3px;
// }

// .plans-filter-length-input-wrapper span {
//   line-height: 20px;
// }

// .plans-filter-length-input-container i {
//   font-size: 18px;
// }

// .plans-goal-filter-container {
//   display: flex;
//   flex-direction: column;
// }

// .plans-goal-filter-container h6 {
//   margin: 0 0 5px 0;
// }

// .plans-goal-filter-container label {
//   font-size: 12px;
//   display: flex;
//   align-items: center;
//   color: rgb(99, 89, 89);
// }
