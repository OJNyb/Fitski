import React from "react";
import { ensureDecimal } from "../../../utils/ensureDecimal";
import { findAllOccurencesOfExercise } from "../../../utils/findAllOccurencesOfExercise";
import {
  displayDateWeekday,
  reverseHistoryDate
} from "../../../utils/formatHistoryDate";

const HistoryView = ({ exercise, historyDays }) => {
  const { name, _id: exerciseId } = exercise;

  let exerciseHistory = findAllOccurencesOfExercise(historyDays, exerciseId);

  let dayView = exerciseHistory.map(x => <Day day={x} />);
  return <div className="history-mobile-exercise-history-body">{dayView}</div>;
};

const Day = ({ day }) => {
  const { date, sets } = day;
  let setsView = sets.map(x => {
    return <Column set={x} />;
  });
  return (
    <div className="history-mobile-exercise-history-day-container">
      <div className="history-mobile-exercise-input-header">
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
        <span className="history-mobile-exercise-list-bold-span">
          {ensureDecimal(weight)}
        </span>
        <span className="history-mobile-exercise-list-small-span">kgs</span>
      </div>
      <div className="history-mobile-exercise-list-label-wrapper">
        <span className="history-mobile-exercise-list-bold-span">{reps}</span>
        <span className="history-mobile-exercise-list-small-span">reps</span>
      </div>
    </div>
  );
};

const OldHistoryView = () => {
  return (
    <div className="history-mobile-exercise-history-body">
      <div className="history-mobile-exercise-history-day-container">
        <div className="history-mobile-exercise-input-header">
          TUESDAY, OCTOBER 29
        </div>
        <div className="history-mobile-exercise-history-column">
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">
              100.0
            </span>
            <span className="history-mobile-exercise-list-small-span">kgs</span>
          </div>
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">6</span>
            <span className="history-mobile-exercise-list-small-span">
              reps
            </span>
          </div>
        </div>
        <div className="history-mobile-exercise-history-column">
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">
              100.0
            </span>
            <span className="history-mobile-exercise-list-small-span">kgs</span>
          </div>
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">6</span>
            <span className="history-mobile-exercise-list-small-span">
              reps
            </span>
          </div>
        </div>
        <div className="history-mobile-exercise-history-column">
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">
              100.0
            </span>
            <span className="history-mobile-exercise-list-small-span">kgs</span>
          </div>
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">6</span>
            <span className="history-mobile-exercise-list-small-span">
              reps
            </span>
          </div>
        </div>
      </div>
      <div className="history-mobile-exercise-history-day-container">
        <div className="history-mobile-exercise-input-header">
          TUESDAY, OCTOBER 29
        </div>
        <div className="history-mobile-exercise-history-column">
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">
              100.0
            </span>
            <span className="history-mobile-exercise-list-small-span">kgs</span>
          </div>
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">6</span>
            <span className="history-mobile-exercise-list-small-span">
              reps
            </span>
          </div>
        </div>
        <div className="history-mobile-exercise-history-column">
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">
              100.0
            </span>
            <span className="history-mobile-exercise-list-small-span">kgs</span>
          </div>
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">6</span>
            <span className="history-mobile-exercise-list-small-span">
              reps
            </span>
          </div>
        </div>
        <div className="history-mobile-exercise-history-column">
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">
              100.0
            </span>
            <span className="history-mobile-exercise-list-small-span">kgs</span>
          </div>
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">6</span>
            <span className="history-mobile-exercise-list-small-span">
              reps
            </span>
          </div>
        </div>
      </div>
      <div className="history-mobile-exercise-history-day-container">
        <div className="history-mobile-exercise-input-header">
          TUESDAY, OCTOBER 29
        </div>
        <div className="history-mobile-exercise-history-column">
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">
              100.0
            </span>
            <span className="history-mobile-exercise-list-small-span">kgs</span>
          </div>
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">6</span>
            <span className="history-mobile-exercise-list-small-span">
              reps
            </span>
          </div>
        </div>
        <div className="history-mobile-exercise-history-column">
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">
              100.0
            </span>
            <span className="history-mobile-exercise-list-small-span">kgs</span>
          </div>
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">6</span>
            <span className="history-mobile-exercise-list-small-span">
              reps
            </span>
          </div>
        </div>
        <div className="history-mobile-exercise-history-column">
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">
              100.0
            </span>
            <span className="history-mobile-exercise-list-small-span">kgs</span>
          </div>
          <div className="history-mobile-exercise-list-label-wrapper">
            <span className="history-mobile-exercise-list-bold-span">6</span>
            <span className="history-mobile-exercise-list-small-span">
              reps
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryView;
