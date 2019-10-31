import React, { useState, useEffect, useContext } from "react";
import { GET_EXERCISES } from "../../../types/exerciseTypes";
import { ExerciseContext } from "../../../context/exerciseContext";

import "./exerciseTable.css";
import "./mobileExerciseView.css";

const muscleGroupArray = [
  "Shoulders",
  "Triceps",
  "Biceps",
  "Chest",
  "Legs",
  "Back"
];

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

  console.log(muscleGroup);
  if ((search.length || muscleGroup.length) && exercisesToShow) {
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
    exerciseDisplay = muscleGroupArray.map(x => (
      <MuscleGroupItem mg={x} onClick={() => setMuscleGroup(x)} />
    ));
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

const MuscleGroupItem = ({ mg, onClick }) => {
  return (
    <div className="mobile-exercise-item" onClick={onClick}>
      {mg}
    </div>
  );
};

export default MobileExerciseView;
