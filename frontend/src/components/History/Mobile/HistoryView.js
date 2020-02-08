import React from "react";
import { findAllOccurencesOfExercise } from "../../../utils/findAllOccurencesOfExercise";
import {
  displayDateWeekday,
  reverseHistoryDate,
  formatHistoryDate
} from "../../../utils/formatHistoryDate";
import { Row } from "../ExerciseText";

const HistoryView = ({ exercise, historyDays }) => {
  const { _id: exerciseId, unit } = exercise;
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
    .map((x, y) => <Day day={x} key={y} unit={unit} />);
  return <div className="history-mobile-exercise-history-body">{dayView}</div>;
};

const Day = ({ day, unit }) => {
  const { date, sets } = day;
  let setsView = sets.map(x => {
    return <Row set={x} key={x._id} unit={unit} />;
  });
  return (
    <div className="margin-top-10">
      <div className="history-exercise-input-header font-14 font-w-500 color-gray">
        {displayDateWeekday(reverseHistoryDate(date))}
      </div>
      {setsView}
    </div>
  );
};

export default HistoryView;
