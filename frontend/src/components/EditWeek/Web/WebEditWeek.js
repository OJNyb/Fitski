import React from "react";

import WebExerciseCard from "./WebExerciseCard";
import Exercises from "../../shared/Exercises/Exercises";
import useSetLoading from "../../../hooks/useSetLoading";

const WebEditWeek = ({
  currentWeek,
  handleEditSet,
  handleAddSet,
  currentDayIndex,
  handleDeleteSet,
  handleAddExercise,
  setCurrentDayIndex,
  handleDeleteExercise
}) => {
  const { days } = currentWeek;
  const currentDay = days[currentDayIndex];
  const { _id: dayId } = currentDay;
  const { exercises } = currentDay;
  useSetLoading(false);

  let dayBtns = days.map((day, index) => (
    <button
      key={day._id}
      onClick={() => setCurrentDayIndex(index)}
      className={currentDayIndex === index ? "edit-week-day-active" : ""}
    >
      {index + 1}
    </button>
  ));

  let exerciseCards = exercises.map(x => (
    <WebExerciseCard
      key={x._id}
      dayId={dayId}
      exercise={x}
      onAddSet={handleAddSet}
      handleEditSet={handleEditSet}
      handleDeleteSet={handleDeleteSet}
      onDeleteExercise={handleDeleteExercise}
    />
  ));

  return (
    <div className="edit-week-container">
      <div className="edit-week-add-container">
        <h2 className="edit-week-header color-gray">Days</h2>

        <div className="edit-week-add-days-container">{dayBtns}</div>
        {exerciseCards}
      </div>
      <div className="edit-week-exercise-container">
        <h2 className="edit-week-header color-gray">Exercises</h2>
        <Exercises handleAddExercise={handleAddExercise} />;
      </div>
    </div>
  );
};

export default WebEditWeek;
