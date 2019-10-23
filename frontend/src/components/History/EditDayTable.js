import React from "react";
import { displayMuscleGroups } from "../../utils/displayMuscleGroups";

import DayExercise from "./DayExercise";

import "./editDay.css";

const EditDayTable = ({
  day,
  showWeight,
  handleAddSet,
  handleEditSet,
  handleDeleteSet,
  handleDeleteExercise
}) => {
  const { exercises } = day;

  let exerciseDisplay = exercises.map(exercise => {
    if (!exercise || !exercise.exercise) {
      return null;
    } else {
      return (
        <DayExercise
          dayId={day._id}
          key={exercise._id}
          exercise={exercise}
          showWeight={showWeight}
          onAddSet={handleAddSet}
          handleEditSet={handleEditSet}
          handleDeleteSet={handleDeleteSet}
          onDeleteExercise={handleDeleteExercise}
        />
      );
    }
  });

  let muscleGroup = displayMuscleGroups(exercises);

  return (
    <>
      <div className="history-add-muscle-group-container">
        {muscleGroup.length !== 0 && (
          <>
            {/* <p className="history-muscle-group-label">Muscle group</p> */}
            <h3 className="history-muscle-group">{muscleGroup}</h3>
          </>
        )}
      </div>

      <div className="history-add-body">{exerciseDisplay}</div>
    </>
  );
};

export default EditDayTable;
