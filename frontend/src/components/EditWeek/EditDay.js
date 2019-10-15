import React from "react";
import { displayMuscleGroups } from "../../utils/displayMuscleGroups";

import DayExercise from "./ExerciseCard";

import "./editWeek.css";

const EditDay = ({ day, handleEditExercise, handleDeleteExercise }) => {
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
          onEditExercise={handleEditExercise}
          onDeleteExercise={handleDeleteExercise}
        />
      );
    }
  });

  let muscleGroup = displayMuscleGroups(exercises);

  return (
    <>
      <div className="edit-week-add-muscle-group-container">
        {muscleGroup.length !== 0 && (
          <>
            <p className="edit-week-muscle-group-label">Muscle group</p>
            <h3 className="edit-week-muscle-group">{muscleGroup}</h3>
          </>
        )}
      </div>

      <div className="edit-week-add-header">
        <span>Sets</span>
        <span>Reps</span>
      </div>
      <div className="edit-week-add-body">{exerciseDisplay}</div>
    </>
  );
};

export default EditDay;
