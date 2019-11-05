import React from "react";
import MobileExercisesNav from "./MobileExercisesNav";

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
  closeExercises,
  setMuscleGroup,
  exercisesToShow,
  handleSearchChange,
  handleAddCustomExercise
}) => {
  let exerciseDisplay;

  if (!exercisesToShow) exerciseDisplay = <p>No exercise with that name</p>;

  let shouldShowExercises =
    (search.length || muscleGroup.length) && exercisesToShow;

  if (shouldShowExercises) {
    let exercisesToDisplay = exercisesToShow.map(x => (
      <div
        className="mobile-exercise-item"
        key={x._id}
        onClick={() => {
          onAddExercise(x);
          closeExercises();
        }}
      >
        {x.name}
      </div>
    ));
    exerciseDisplay = (
      <>
        <div
          className="flex-ai-center mobile-exercise-nav-back-wrapper"
          onClick={() => setMuscleGroup([])}
        >
          <i className="material-icons-round">keyboard_arrow_left</i>
          <span>Muscle groups</span>
        </div>
        {exercisesToDisplay}
      </>
    );
  } else {
    exerciseDisplay = muscleGroupArray.map(x => (
      <MuscleGroupItem key={x} mg={x} onClick={() => setMuscleGroup(x)} />
    ));
  }

  return (
    <>
      <MobileExercisesNav
        closeExercises={closeExercises}
        handleAddCustomExercise={handleAddCustomExercise}
      />
      <div className="mobile-exercises-container">
        <div className="mobile-exercises-head">
          <i className="material-icons">search</i>
          <div className="flex-col mobile-exercises-search-wrapper">
            <input value={search} onChange={handleSearchChange} />
            <div className="border-with-sides" />
          </div>
        </div>
        <div className="mobile-exercises-body">{exerciseDisplay}</div>
      </div>
    </>
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
