import React, { useEffect, useCallback } from "react";

const MuscleGroupDropdown = ({
  muscleGroup,
  muscleGroups,
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
  let muscleGroupFilter = muscleGroups.map(x => {
    return (
      <MuscleGroupCheck
        key={x._id}
        muscle={x}
        checked={muscleGroup.includes(x._id)}
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
        onClick(muscle._id);
      }}
    >
      <span className="font-14">{muscle.name}</span>
      {checked && <i className="material-icons">checked</i>}
    </div>
  );
};

export default MuscleGroupDropdown;
