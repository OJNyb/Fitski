import React, { useState, useEffect } from "react";
import useSetLoading from "../../../../hooks/useSetLoading";
import Search from "../../SVGs/Search";
import EditAddExerciseModal from "./WebAddExerciseModal";

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
  handleSearchChange,
  handleEditExercise,
  handleDeleteExercise,
  handleAddCustomExercise
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useSetLoading(false);

  let exercisesDisplay;
  if (isPending) exercisesDisplay = <p>Loading...</p>;
  if (exercisesToShow) {
    exercisesDisplay = exercisesToShow.map(x => (
      <div
        className="exercises-item flex-center-space-bw"
        key={x._id}
        onClick={() => onAddExercise(x)}
      >
        {x.name}
        <button
          onClick={e => {
            e.stopPropagation();
            setShowModal(x);
          }}
        >
          <i className="material-icons color-light-gray">more_horiz</i>
        </button>
      </div>
    ));
  }

  function handleAddCustom(name, category) {
    setShowModal(false);
    handleAddCustomExercise(name, category);
  }

  function handleMuscleGroupCheck(muscle) {
    let index = muscleGroup.indexOf(muscle);
    let newMuscleGroup = muscleGroup.concat();
    if (index === -1) {
      newMuscleGroup.push(muscle);
    } else {
      newMuscleGroup.splice(index, 1);
    }

    setMuscleGroup(newMuscleGroup);
  }

  let modal;
  if (showModal === "add") {
    modal = (
      <EditAddExerciseModal
        header={"Add Exercise"}
        hideModal={() => setShowModal(false)}
        buttonText={"Add"}
        handleSubmit={handleAddCustom}
      />
    );
  } else if (showModal) {
    const { name, muscleGroup, custom } = showModal;
    modal = (
      <EditAddExerciseModal
        header={"Edit Exercise"}
        cantEdit={!custom}
        hideModal={() => setShowModal(false)}
        buttonText={"Edit"}
        initName={name}
        initCategory={muscleGroup}
        handleSubmit={handleEditExercise}
      />
    );
  }

  return (
    <>
      {modal}
      <div className="exercises-container">
        <div className="exercises-head">
          <div className="exercise-search-container flex-center-space-bw">
            <input value={search} onChange={handleSearchChange} />
            <Search />
          </div>

          <div className="exercise-muscle-group-wrapper flex-center-space-bw">
            <button
              className={
                "exercise-muscle-group-btn flex-ai-center" +
                (muscleGroup.length
                  ? " exercises-muscle-group-item-checked font-w-500"
                  : "")
              }
              onClick={() => setShowFilter(!showFilter)}
            >
              <span>Muscle group</span>
              <i
                className={
                  "material-icons-round" + (showFilter ? " rotate-180" : "")
                }
              >
                keyboard_arrow_down
              </i>
            </button>

            <button
              className="tc flex-ai-center"
              onClick={() => setShowModal("add")}
            >
              <span>Add Exercise</span>
            </button>
          </div>
          {showFilter && (
            <MuscleGroupDropdown
              muscleGroup={muscleGroup}
              setShowFilter={setShowFilter}
              onMuscleGroupCheck={handleMuscleGroupCheck}
            />
          )}
        </div>
        <div className="exercises-body">
          <div></div>
          <div>{exercisesDisplay}</div>
        </div>
      </div>
    </>
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

const MuscleGroupDropdown = ({
  muscleGroup,
  setShowFilter,
  onMuscleGroupCheck
}) => {
  function outsideClickHandler() {
    setShowFilter(false);
  }
  useEffect(() => {
    function setClickHandler() {
      window.addEventListener("click", outsideClickHandler);
    }
    setClickHandler();
    return () => {
      window.removeEventListener("click", outsideClickHandler);
    };
  }, []);
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

export default ExercisesBigView;
