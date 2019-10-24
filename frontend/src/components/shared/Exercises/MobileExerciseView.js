import React, { useState, useEffect, useContext } from "react";
import { GET_EXERCISES } from "../../../types/exerciseTypes";
import { ExerciseContext } from "../../../context/exerciseContext";

import "./exerciseTable.css";
import "./mobileExerciseView.css";

const MobileExerciseView = ({
  search,
  muscleGroup,
  onAddExercise,
  setMuscleGroup,
  exercisesToShow,
  handleSearchChange
}) => {
  let exerciseDisplay;

  if (!exercisesToShow) exerciseDisplay = <p>No exercise with that name</p>;

  console.log(search.length);
  if ((search.length || muscleGroup !== "All") && exercisesToShow) {
    exerciseDisplay = exercisesToShow.map(x => (
      <div
        className="mobile-exercise-item"
        key={x._id}
        onClick={() => onAddExercise(x)}
      >
        {x.name}
      </div>
    ));
  } else {
    exerciseDisplay = (
      <>
        {/* <div
          className="mobile-exercise-item"
          onClick={() => setMuscleGroup("Abs")}
        >
          Abs
        </div> */}
        <div
          className="mobile-exercise-item"
          onClick={() => setMuscleGroup("Back")}
        >
          Back
        </div>
        <div
          className="mobile-exercise-item"
          onClick={() => setMuscleGroup("Legs")}
        >
          Legs
        </div>
        <div
          className="mobile-exercise-item"
          onClick={() => setMuscleGroup("Chest")}
        >
          Chest
        </div>
        <div
          className="mobile-exercise-item"
          onClick={() => setMuscleGroup("Biceps")}
        >
          Biceps
        </div>
        <div
          className="mobile-exercise-item"
          onClick={() => setMuscleGroup("Triceps")}
        >
          Triceps
        </div>
        <div
          className="mobile-exercise-item"
          onClick={() => setMuscleGroup("Shoulders")}
        >
          Shoulders
        </div>
      </>
    );
  }

  return (
    <div className="mobile-exercises-container">
      <div className="mobile-exercises-head">
        <i className="material-icons">search</i>
        <input value={search} onChange={handleSearchChange} />
      </div>
      <div className="mobile-exercises-body">{exerciseDisplay}</div>
    </div>
  );
};

export default MobileExerciseView;
