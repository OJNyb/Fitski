import React from "react";

import DayHOC from "./DayHOC";
import Exercises from "../shared/Exercises/Exercises";

const BigScreenEditWeek = ({
  weeks,
  planId,
  weekIndex,
  currentWeek,
  handleEditSet,
  handleAddSet,
  currentDayIndex,
  handleDeleteSet,
  handleAddExercise,
  setCurrentDayIndex,
  handleDeleteExercise
}) => {
  const { days, _id: weekId } = currentWeek;
  const currentDay = days[currentDayIndex];
  const { _id: dayId } = currentDay;
  const { exercises } = currentDay;

  let dayBtns = days.map((day, index) => (
    <button
      key={day._id}
      onClick={() => setCurrentDayIndex(index)}
      className={currentDayIndex === index ? "edit-week-day-active" : ""}
    >
      {index + 1}
    </button>
  ));
  return (
    <div className="edit-week-container">
      <div className="edit-week-add-container">
        <h2 className="edit-week-header">Days</h2>

        <div className="edit-week-add-days-container">{dayBtns}</div>
        <DayHOC day={currentDay} />
      </div>
      <div className="edit-week-exercise-container">
        <h2 className="edit-week-header">Exercises</h2>
        <Exercises handleAddExercise={handleAddExercise} />;
      </div>
    </div>
  );
};

export default BigScreenEditWeek;
