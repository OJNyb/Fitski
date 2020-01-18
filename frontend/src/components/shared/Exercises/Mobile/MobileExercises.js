import React, { useState, useContext } from "react";
import useLongPressAndClick from "../../../../hooks/useLongPressAndClick";
import { ExerciseContext } from "../../../../context/exerciseContext";
import { deleteMuscleGroup } from "../../../../utils/exerciseClient";

import MobileExercisesNav from "./MobileExercisesNav";
import useSetLoading from "../../../../hooks/useSetLoading";
import AddCategoryModal from "../AddCategoryModal";
import ConfirmModal from "../../Modal/ConfirmModal";

import "./mobileExercises.css";

const MobileExerciseView = ({
  search,
  setShowModal,
  muscleGroup,
  muscleGroups,
  onAddExercise,
  closeExercises,
  setMuscleGroup,
  exercisesToShow,
  handleSearchChange,
  handleAddCustomExercise
}) => {
  useSetLoading(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);
  const [showMuscleGroupModal, setShowMuscleGroupModal] = useState(false);
  const { dispatch } = useContext(ExerciseContext);

  let exerciseDisplay;
  if (!exercisesToShow) exerciseDisplay = <p>No exercise with that name</p>;

  const shouldShowExercises =
    (search.length || muscleGroup.length) && exercisesToShow;

  function handleBackClick() {
    if (shouldShowExercises) {
      setMuscleGroup([]);
    } else {
      closeExercises();
    }
  }

  let header = shouldShowExercises
    ? muscleGroups.find(x => x._id === muscleGroup[0]).name
    : "Exercises";

  function handleSelectExercise(exercise) {
    let exerciseIndex = selectedExercises.map(x => x._id).indexOf(exercise._id);
    if (exerciseIndex === -1) {
      setSelectedExercises([...selectedExercises, exercise]);
    } else {
      let newSE = selectedExercises.concat();
      newSE.splice(exerciseIndex, 1);
      setSelectedExercises(newSE);
    }
  }

  function handleSelectMuscleGroup(muscleGroup) {
    if (selectedMuscleGroup && selectedMuscleGroup._id === muscleGroup._id) {
      setSelectedMuscleGroup(null);
    } else {
      setSelectedMuscleGroup(muscleGroup);
      setSelectedExercises([]);
    }
  }

  function handleDeleteMuscleGroup() {
    deleteMuscleGroup(dispatch, selectedMuscleGroup._id).then(() => {
      setShowMuscleGroupModal(false);
      setSelectedMuscleGroup(null);
    });
  }

  const selectedIds = selectedExercises.map(x => x._id);
  if (shouldShowExercises) {
    const onClick = selectedExercises.length
      ? x => {
          handleSelectExercise(x);
        }
      : x => {
          onAddExercise(x);
          closeExercises();
        };
    exerciseDisplay = exercisesToShow.map(x => (
      <ExerciseItem
        key={x._id}
        exercise={x}
        onClick={onClick}
        selected={selectedIds.indexOf(x._id) > -1}
        onSelectExercise={handleSelectExercise}
      />
    ));
  } else {
    exerciseDisplay = muscleGroups.map(x => {
      const onClick = selectedMuscleGroup
        ? () => handleSelectMuscleGroup(x)
        : () => setMuscleGroup([x._id]);
      return (
        <MuscleGroupItem
          key={x._id}
          muscleGroup={x}
          onClick={onClick}
          onHold={handleSelectMuscleGroup}
          selected={selectedMuscleGroup && selectedMuscleGroup._id === x._id}
        />
      );
    });
  }

  let muscleGroupModal;
  if (showMuscleGroupModal) {
    const { type } = showMuscleGroupModal;
    if (type === "edit") {
      muscleGroupModal = (
        <AddCategoryModal
          hideModal={() => {
            setShowMuscleGroupModal(false);
          }}
          muscleGroups={muscleGroups}
          muscleGroupToEdit={selectedMuscleGroup}
        />
      );
    } else if (type === "delete") {
      const { name, isPending, isRejected } = selectedMuscleGroup;
      muscleGroupModal = (
        <ConfirmModal
          text={
            <>
              Deleting <span className="font-w-500">{name}</span> will also
              delete all of it's exercises
            </>
          }
          header={"Delete Category"}
          onSubmit={handleDeleteMuscleGroup}
          hideModal={() => setShowMuscleGroupModal(false)}
          isPending={isPending}
          isRejected={isRejected}
        />
      );
    }
  }

  return (
    <>
      {muscleGroupModal}
      <MobileExercisesNav
        header={header}
        setShowModal={setShowModal}
        onBackClick={handleBackClick}
        handleAddCustomExercise={handleAddCustomExercise}
      />

      {selectedExercises.length > 0 && (
        <SelectedNavBar
          showEdit={selectedExercises.length === 1}
          onCheckClick={() => setSelectedExercises([])}
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
          text={`${selectedExercises.length} ${
            selectedExercises.length > 1 ? "exercises" : "exercise"
          }`}
          onEditClick={() =>
            setShowModal({ type: "edit", exercises: selectedExercises })
          }
          onDeleteClick={() =>
            setShowModal({ type: "delete", exercises: selectedExercises })
          }
        />
      )}
      {selectedMuscleGroup && (
        <SelectedNavBar
          showEdit={true}
          text={selectedMuscleGroup.name}
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
          onCheckClick={() => setSelectedMuscleGroup(null)}
          onEditClick={() => setShowMuscleGroupModal({ type: "edit" })}
          onDeleteClick={() => setShowMuscleGroupModal({ type: "delete" })}
        />
      )}
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

const MuscleGroupItem = ({ muscleGroup, onHold, onClick, selected }) => {
  const { onTouchEnd, onTouchStart, onTouchMove } = useLongPressAndClick(
    () => onHold(muscleGroup),
    onClick
  );

  return (
    <div
      className={
        "mobile-exercise-item" +
        (selected ? " mobile-exercise-item-selected" : "")
      }
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
    >
      {muscleGroup.name}
    </div>
  );
};

const ExerciseItem = ({ onClick, exercise, selected, onSelectExercise }) => {
  const { name } = exercise;
  const { onTouchEnd, onTouchStart, onTouchMove } = useLongPressAndClick(
    () => onSelectExercise(exercise),
    () => onClick(exercise)
  );

  return (
    <>
      <div
        className={
          "mobile-exercise-item" +
          (selected ? " mobile-exercise-item-selected" : "")
        }
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
      >
        {name}
      </div>
    </>
  );
};

const SelectedNavBar = ({
  text,
  showEdit,
  onEditClick,
  onCheckClick,
  onDeleteClick
}) => {
  return (
    <div className="width-100p flex-center-space-bw fixed exercises-mobile-selected-container">
      <div className="flex-ai-center exercises-mobile-check-n-span-wrapper">
        <button className="padding-5" onClick={onCheckClick}>
          <i className="material-icons-outlined">check</i>
        </button>
        <span className="exercises-mobile-selected-exercises-span black font-w-500 font-14">
          {text}
        </span>
      </div>

      <div className="flex-ai-center">
        {showEdit && (
          <button className="padding-5" onClick={onEditClick}>
            <i className="material-icons-outlined">edit</i>
          </button>
        )}
        <button className="padding-5" onClick={onDeleteClick}>
          <i className="material-icons-outlined">delete</i>
        </button>
      </div>
    </div>
  );
};

export default MobileExerciseView;
