import React from "react";
import { displayMuscleGroups } from "../../utils/displayMuscleGroups";

import ExerciseCard from "./ExerciseCard";

import "./editWeek.css";

const EditDay = ({
  day,
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
        <ExerciseCard
          dayId={day._id}
          key={exercise._id}
          exercise={exercise}
          onAddSet={handleAddSet}
          handleEditSet={handleEditSet}
          handleDeleteSet={handleDeleteSet}
          onDeleteExercise={handleDeleteExercise}
        />
      );
    }
  });

  return (
    <>
      <div className="edit-week-add-header">
        <span>Sets</span>
        <span>Reps</span>
      </div>
      <div className="edit-week-add-body">{exerciseDisplay}</div>
    </>
  );
};

export default EditDay;
