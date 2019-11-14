import React from "react";
import { ensureDecimal } from "../../../utils/ensureDecimal";
import { findAllOccurencesOfExercise } from "../../../utils/findAllOccurencesOfExercise";
import {
  displayDateWeekday,
  reverseHistoryDate,
  formatHistoryDate
} from "../../../utils/formatHistoryDate";

const HistoryView = ({ exercise, historyDays }) => {
  const { _id: exerciseId } = exercise;
  const todayFormatted = formatHistoryDate(new Date());

  let exerciseHistory = findAllOccurencesOfExercise(historyDays, exerciseId);

  let sliceIndex;
  for (let i = exerciseHistory.length - 1; i >= 0; i--) {
    if (exerciseHistory[i].date > todayFormatted) {
      sliceIndex = i;
    } else {
      break;
    }
  }

  if (sliceIndex) {
    exerciseHistory = exerciseHistory.slice(0, sliceIndex);
  }

  let dayView = exerciseHistory
    .reverse()
    .map((x, y) => <Day day={x} key={y} />);
  return <div className="history-mobile-exercise-history-body">{dayView}</div>;
};

const Day = ({ day }) => {
  const { date, sets } = day;
  let setsView = sets.map(x => {
    return <Column set={x} key={x._id} />;
  });
  return (
    <div className="history-mobile-exercise-history-day-container">
      <div className="history-mobile-exercise-input-header font-w-500 color-gray">
        {displayDateWeekday(reverseHistoryDate(date))}
      </div>
      {setsView}
    </div>
  );
};

const Column = ({ set }) => {
  const { reps, weight } = set;
  return (
    <div className="history-mobile-exercise-history-column">
      <div className="history-mobile-exercise-list-label-wrapper">
        <b className="color-gray mr-1">{ensureDecimal(weight)}</b>
        <span className="black font-12 font-w-300">kg</span>
      </div>
      <div className="history-mobile-exercise-list-label-wrapper">
        <b className="color-gray mr-1">{reps}</b>
        <span className="black font-12 font-w-300">reps</span>
      </div>
    </div>
  );
};

export default HistoryView;
