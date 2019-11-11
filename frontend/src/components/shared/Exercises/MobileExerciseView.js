import React, { useState, useEffect, useCallback } from "react";
import MobileExercisesNav from "./MobileExercisesNav";

import "./exerciseTable.css";
import "./mobileExerciseView.css";
import useSetLoading from "../../../hooks/useSetLoading";

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
  useSetLoading(false);
  const [editView, setEditView] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);

  if (!exercisesToShow) exerciseDisplay = <p>No exercise with that name</p>;

  const shouldShowExercises =
    (search.length || muscleGroup.length) && exercisesToShow;

  if (shouldShowExercises) {
    const onClick = editView
      ? x => setSelectedExercises([...selectedExercises, x])
      : x => {
          onAddExercise(x);
          closeExercises();
        };
    const exercisesToDisplay = exercisesToShow.map(x => (
      <div
        className="mobile-exercise-item"
        key={x._id}
        onClick={() => onClick(x)}
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

  let editExerciseNav = null;
  if (selectedExercises.length) {
    editExerciseNav = (
      <div className="width-100p flex-ai-center">
        <button>
          <i className="material-icons-outlined">edit</i>
        </button>
        <button>
          <i className="material-icons-outlined">delete</i>
        </button>
      </div>
    );
  }

  return (
    <>
      <MobileExercisesNav
        editView={editView}
        setEditView={setEditView}
        closeExercises={closeExercises}
        handleAddCustomExercise={handleAddCustomExercise}
      />

      <div className="mobile-exercises-container">
        {editExerciseNav}
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

function useLongPress(callback = () => {}, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [startLongPress]);

  const start = useCallback(() => {
    setStartLongPress(true);
  }, []);
  const stop = useCallback(() => {
    setStartLongPress(false);
  }, []);

  return {
    onTouchEnd: stop,
    onMouseLeave: stop,
    onTouchStart: start
  };
}

export default MobileExerciseView;
