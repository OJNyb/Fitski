import React, { useEffect, useCallback } from "react";

const Categories = ({ selectedMG, muscleGroups, hideDropdown, onClick }) => {
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
        muscleGroup={x}
        checked={selectedMG._id === x._id}
        onClick={onClick}
      />
    );
  });
  return (
    <div className="exercise-muscle-checkbox-container exercise-muscle-checkbox-container-show">
      <div className="exercise-muscle-group-filter-wrapper flex-col custom-scrollbar">
        {muscleGroupFilter}
      </div>
    </div>
  );
};

const MuscleGroupCheck = ({ muscleGroup, checked, onClick }) => {
  const { name } = muscleGroup;
  return (
    <div
      className={
        "exercises-muscle-group-item flex-center-space-bw" +
        (checked
          ? " exercises-muscle-group-item-checked black font-w-500"
          : " color-gray font-w-400")
      }
      onClick={e => {
        onClick(e, muscleGroup);
      }}
    >
      <span className="font-14">{name}</span>
      {checked && <i className="material-icons">checked</i>}
    </div>
  );
};

export default Categories;
