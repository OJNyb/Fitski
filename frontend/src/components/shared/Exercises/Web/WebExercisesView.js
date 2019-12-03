import React, { useRef, useState } from "react";
import useSetLoading from "../../../../hooks/useSetLoading";
import Search from "../../SVGs/Search";
import EditAddExerciseModal from "./WebAddExerciseModal";
import ConfirmModal from "../../Modal/ConfirmModal";

import "./webExercises.css";
import DropDown from "../../DropDown/DropDown";
import MuscleGroupDropdown from "./MuscleGroupDropdown";

const ExercisesBigView = ({
  search,
  isPending,
  muscleGroup,
  onAddExercise,
  setMuscleGroup,
  exercisesToShow,
  handleSearchChange,
  handleEditExercise,
  handleDeleteExercises,
  handleAddCustomExercise
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useSetLoading(false);

  function handleEditDeleteClick(e, type, exercise) {
    e.stopPropagation();
    setShowModal({ type, exercise });
  }

  function handleAddCustom(name, category) {
    setShowModal(false);
    handleAddCustomExercise(name, category);
  }

  function handleEditSubmit(name, category) {
    const {
      exercise: { _id }
    } = showModal;
    handleEditExercise(_id, { name, category });
    setShowModal(false);
  }

  function handleDeleteSubmit() {
    handleDeleteExercises([showModal.exercise._id]);
    setShowModal(false);
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
        handleEditDeleteClick={handleEditDeleteClick}
      />
    ));
  }

  let modal;
  if (showModal) {
    const { type, exercise } = showModal;
    if (type === "add") {
      modal = (
        <EditAddExerciseModal
          header={"Add Exercise"}
          hideModal={() => setShowModal(false)}
          buttonText={"Add"}
          handleSubmit={handleAddCustom}
        />
      );
    } else if (type === "edit") {
      const { name, muscleGroup, custom } = exercise;
      modal = (
        <EditAddExerciseModal
          header={"Edit Exercise"}
          cantEdit={!custom}
          hideModal={() => setShowModal(false)}
          buttonText={"Edit"}
          initName={name}
          initCategory={muscleGroup}
          handleSubmit={handleEditSubmit}
        />
      );
    } else if (type === "delete") {
      const { name } = exercise;
      modal = (
        <ConfirmModal
          text={
            <>
              Are you sure you want to delete{" "}
              <span className="font-w-500">{name}?</span>
            </>
          }
          header={"Delete exercise"}
          hideModal={() => setShowModal(false)}
          onSubmit={handleDeleteSubmit}
        />
      );
    }
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
                "exercise-muscle-group-btn flex-ai-center bc-white" +
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
              onClick={() => setShowModal({ type: "add" })}
            >
              <span>Add Exercise</span>
            </button>
          </div>
          {showFilter && (
            <MuscleGroupDropdown
              muscleGroup={muscleGroup}
              hideDropdown={() => setShowFilter(false)}
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

const ExerciseItem = ({ onClick, exercise, handleEditDeleteClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const moreBtn = useRef(null);
  const { name } = exercise;
  return (
    <div
      className="exercises-item border-box flex-center-space-bw"
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
  );
};

const ExerciseDropdown = ({
  moreBtn,
  exercise,
  setShowDropdown,
  onEditDeleteClick
}) => {
  console.log(moreBtn.current);
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
export default ExercisesBigView;
