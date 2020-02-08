import React, { useRef, useState } from "react";
import useSetLoading from "../../../../hooks/useSetLoading";
import Search from "../../SVGs/Search";

import "./webExercises.css";
import DropDown from "../../DropDown/DropDown";
import MuscleGroupDropdown from "./MuscleGroupDropdown";
import FilterIcon from "../FilterIcon";
import AddExerciseIcon from "../AddExerciseIcon";

const Exercises = ({
  search,
  isPending,
  muscleGroup,
  setShowModal,
  muscleGroups,
  onAddExercise,
  setMuscleGroup,
  exercisesToShow,
  handleSearchChange,
  handleDeleteExercises,
  handleAddExerciseRetry,
  handleEditExerciseRetry
}) => {
  const [showFilter, setShowFilter] = useState(false);

  useSetLoading(false);

  function handleEditDeleteClick(e, type, exercise) {
    e.stopPropagation();
    setShowModal({ type, exercises: [exercise] });
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

  let exercisesDisplay;
  if (isPending) exercisesDisplay = <p>Loading...</p>;
  if (exercisesToShow) {
    exercisesDisplay = exercisesToShow.map(x => (
      <ExerciseItem
        key={x._id}
        exercise={x}
        onClick={() => onAddExercise(x)}
        onDeleteExercises={handleDeleteExercises}
        onAddExerciseRetry={handleAddExerciseRetry}
        onEditExerciseRetry={handleEditExerciseRetry}
        handleEditDeleteClick={handleEditDeleteClick}
      />
    ));
  }

  return (
    <>
      <div className="exercises-container">
        <div className="exercise-search-container flex-center-space-bw shadow-small">
          <input value={search} onChange={handleSearchChange} />
          <Search />
        </div>

        <div className="exercises-body-wrapper shadow-medium">
          <div className="exercises-head">
            <div className="exercise-muscle-group-wrapper flex-center-space-bw">
              <button
                className={
                  "exercise-muscle-group-btn flex-ai-center bc-white shadow-medium-clickable" +
                  (muscleGroup.length
                    ? " exercises-muscle-group-item-checked font-w-500"
                    : "")
                }
                onClick={() => setShowFilter(!showFilter)}
              >
                <FilterIcon />
                <span className="color-gray">Filter</span>
              </button>

              <button
                className="theme-btn-no-border padding-5 flex-ai-center"
                onClick={() => setShowModal({ type: "add" })}
              >
                <AddExerciseIcon />
              </button>
            </div>

            <MuscleGroupDropdown
              muscleGroup={muscleGroup}
              muscleGroups={muscleGroups}
              hideDropdown={() => setShowFilter(false)}
              showFilter={showFilter}
              onMuscleGroupCheck={handleMuscleGroupCheck}
            />
          </div>
          <div className="exercises-body custom-scrollbar">
            <div></div>
            <div>{exercisesDisplay}</div>
          </div>
        </div>
      </div>
    </>
  );
};

const ExerciseItem = ({ onClick, exercise, handleEditDeleteClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const moreBtn = useRef(null);
  const { name, isPending, isRejected } = exercise;

  // function onRetryClick() {
  //   if (request === "add") {
  //     onAddExerciseRetry(exercise);
  //   } else if (request === "edit") {
  //     onEditExerciseRetry(exercise);
  //   } else if (request === "delete") {
  //     onDeleteExercises([exercise._id]);
  //   }
  // }

  return (
    <>
      <div
        className={
          "exercises-item border-box flex-center-space-bw exercise-card" +
          (isPending ? " exercise-card-pending " : "") +
          (isRejected ? " exercise-card-rejected" : "")
        }
        onClick={onClick}
      >
        <span className="black">{name}</span>
        <button
          ref={moreBtn}
          className="color-light-gray"
          onClick={e => {
            e.stopPropagation();
            setShowDropdown(true);
          }}
        >
          <i className="material-icons">more_horiz</i>
        </button>
        {showDropdown && (
          <ExerciseDropdown
            moreBtn={moreBtn}
            exercise={exercise}
            setShowDropdown={setShowDropdown}
            onEditDeleteClick={handleEditDeleteClick}
          />
        )}
      </div>
    </>
  );
};

const ExerciseDropdown = ({
  moreBtn,
  exercise,
  setShowDropdown,
  onEditDeleteClick
}) => {
  const { current } = moreBtn;

  const rect = current.getBoundingClientRect();
  const { top, left } = rect;

  const style = {
    top: top - 12 + "px",
    left: left - 108 + "px"
  };

  const { custom } = exercise;
  const children = [
    {
      icon: "delete",
      text: "Delete",
      outlined: true,
      customClass: "delete-color",
      action: e => onEditDeleteClick(e, "delete", exercise)
    }
  ];

  if (custom) {
    children.unshift({
      icon: "edit",
      text: "Edit",
      outlined: true,
      action: e => onEditDeleteClick(e, "edit", exercise)
    });
  }
  return (
    <div className="exercises-dropdown-container fixed z-mid" style={style}>
      <DropDown
        children={children}
        hideActionMenu={() => {
          setShowDropdown(false);
        }}
      />
    </div>
  );
};
export default Exercises;
