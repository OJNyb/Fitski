import React, { useEffect, useCallback } from "react";

const muscleGroupArray = [
  "Shoulders",
  "Triceps",
  "Biceps",
  "Chest",
  "Legs",
  "Back"
];

const MuscleGroupDropdown = ({
  muscleGroup,
  hideDropdown,
  onMuscleGroupCheck
}) => {
  const outsideClickHandler = useCallback(() => {
    hideDropdown();
  }, [hideDropdown]);
  useEffect(() => {
    function setClickHandler() {
      window.addEventListener("click", outsideClickHandler);
    }
    setClickHandler();
    return () => {
      window.removeEventListener("click", outsideClickHandler);
    };
  }, [outsideClickHandler]);
  let muscleGroupFilter = muscleGroupArray.map(x => {
    return (
      <MuscleGroupCheck
        key={x}
        muscle={x}
        checked={muscleGroup.includes(x)}
        onClick={onMuscleGroupCheck}
      />
    );
  });
  return (
    <div className="exercise-muscle-checkbox-container exercise-muscle-checkbox-container-show">
      <div className="exercise-muscle-group-filter-wrapper flex-col">
        {muscleGroupFilter}
      </div>
    </div>
  );
};

const MuscleGroupCheck = ({ muscle, checked, onClick }) => {
  return (
    <div
      className={
        "exercises-muscle-group-item flex-center-space-bw" +
        (checked
          ? " exercises-muscle-group-item-checked black font-w-500"
          : " color-gray font-w-400")
      }
      onClick={e => {
        e.stopPropagation();
        onClick(muscle);
      }}
    >
      <span className="font-14">{muscle}</span>
      {checked && <i className="material-icons">checked</i>}
    </div>
  );
};

export default MuscleGroupDropdown;
