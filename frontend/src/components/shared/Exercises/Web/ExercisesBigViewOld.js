import React, { useState } from "react";
import useSetLoading from "../../../../hooks/useSetLoading";

import "./bsExerciseView.css";

const muscleGroupArray = [
  "Back",
  "Legs",
  "Chest",
  "Biceps",
  "Triceps",
  "Shoulders"
];

const ExercisesBigView = ({
  search,
  isPending,
  muscleGroup,
  onAddExercise,
  setMuscleGroup,
  exercisesToShow,
  handleSearchChange
}) => {
  const [showFilter, setShowFilter] = useState(false);
  if (isPending) exercisesDisplay = <p>Loading...</p>;
  useSetLoading(false);

  let exercisesDisplay;
  if (exercisesToShow) {
    exercisesDisplay = exercisesToShow.map(x => (
      <div
        className="exercises-item"
        key={x._id}
        onClick={() => onAddExercise(x)}
      >
        {x.name}
      </div>
    ));
  }

  function onMuscleGroupCheck(muscle) {
    let index = muscleGroup.indexOf(muscle);
    let newMuscleGroup = muscleGroup.concat();
    if (index === -1) {
      newMuscleGroup.push(muscle);
    } else {
      newMuscleGroup.splice(index, 1);
    }

    setMuscleGroup(newMuscleGroup);
  }

  let muscleGroupFilter = muscleGroupArray.map(x => {
    return (
      <MuscleGroupCheck
        key={x}
        muscle={x}
        checked={muscleGroup.includes(x)}
        onChange={onMuscleGroupCheck}
      />
    );
  });

  return (
    <div className="exercises-container">
      <div className="exercises-head">
        <div className="exercise-search-container">
          <i className="material-icons">search</i>
          <input value={search} onChange={handleSearchChange} />
        </div>

        <div className="exercise-muscle-group-button">
          {/* <i className="material-icons-round">arrow_back_ios</i> */}
          <span
            className="exercise-bs-show-filter-span"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filter
          </span>

          <div
            onMouseLeave={() => setShowFilter(false)}
            className={
              "exercise-muscle-checkbox-container" +
              (showFilter ? " exercise-muscle-checkbox-container-show" : "")
            }
          >
            <div className="exercise-muscle-group-filter-wrapper">
              {muscleGroupFilter}
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className="exercises-body">
        <div></div>
        <div>{exercisesDisplay}</div>
      </div>
    </div>
  );
};

const MuscleGroupCheck = ({ muscle, checked, onChange }) => {
  return (
    <label className="custom-checkbox-container">
      <input
        type="checkbox"
        name={muscle}
        checked={checked}
        onChange={() => onChange(muscle)}
      />
      {muscle}
      <span className="custom-checkmark"></span>
    </label>
  );
};

export default ExercisesBigView;
