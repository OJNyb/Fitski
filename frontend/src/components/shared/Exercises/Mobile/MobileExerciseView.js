import React, { useState } from "react";
import useLongPressAndClick from "../../../../hooks/useLongPressAndClick";

import MobileExercisesNav from "./MobileExercisesNav";
import useSetLoading from "../../../../hooks/useSetLoading";
import AddEditExerciseModal from "./AddExerciseModal";
import DeleteExerciseModal from "./DeleteExerciseModal";

import "./mobileExercises.css";

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
  handleEditExercise,
  handleDeleteExercises,
  handleAddExerciseRetry,
  handleAddCustomExercise,
  handleEditExerciseRetry
}) => {
  useSetLoading(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  let modal = null;

  function handleDeleteSubmit() {
    handleDeleteExercises(selectedIds);
    setShowDeleteModal(false);
    setSelectedExercises([]);
  }

  function handleEditSubmit(name, category) {
    setShowEditModal(false);
    handleEditExercise(selectedExercises[0]._id, { name, category });
    setSelectedExercises([]);
  }

  if (showEditModal) {
    const { name, muscleGroup, custom } = selectedExercises[0];

    modal = (
      <AddEditExerciseModal
        initName={name}
        buttonText={"Edit"}
        header={"Edit Exercise"}
        initCategory={muscleGroup}
        handleSubmit={handleEditSubmit}
        hideModal={() => setShowEditModal(false)}
        cantEdit={!custom}
      />
    );
  }

  if (showDeleteModal) {
    modal = (
      <DeleteExerciseModal
        selectedExercises={selectedExercises}
        setShowDeleteModal={setShowDeleteModal}
        onDeleteSubmit={handleDeleteSubmit}
      />
    );
  }

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

  let header = shouldShowExercises ? muscleGroup[0] : "Exercises";

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
        onDeleteExercises={handleDeleteExercises}
        selected={selectedIds.indexOf(x._id) > -1}
        onSelectExercise={handleSelectExercise}
        onAddExerciseRetry={handleAddExerciseRetry}
        onEditExerciseRetry={handleEditExerciseRetry}
      />
    ));
  } else {
    exerciseDisplay = muscleGroupArray.map(x => (
      <MuscleGroupItem key={x} mg={x} onClick={() => setMuscleGroup([x])} />
    ));
  }

  return (
    <>
      <MobileExercisesNav
        header={header}
        onBackClick={handleBackClick}
        handleAddCustomExercise={handleAddCustomExercise}
      />

      {selectedExercises.length > 0 && (
        <SelectedNavBar
          setShowEditModal={setShowEditModal}
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
          setShowDeleteModal={setShowDeleteModal}
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
      {modal}
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

const ExerciseItem = ({
  onClick,
  exercise,
  selected,
  onSelectExercise,
  onDeleteExercises,
  onAddExerciseRetry,
  onEditExerciseRetry
}) => {
  const { name, request, isPending, isRejected } = exercise;
  const { onTouchEnd, onTouchStart, onTouchMove } = useLongPressAndClick(
    () => onSelectExercise(exercise),
    () => onClick(exercise)
  );

  function onRetryClick() {
    if (request === "add") {
      onAddExerciseRetry(exercise);
    } else if (request === "edit") {
      onEditExerciseRetry(exercise);
    } else if (request === "delete") {
      onDeleteExercises([exercise._id]);
    }
  }

  return (
    <>
      <div
        className={
          "mobile-exercise-item" +
          (selected ? " mobile-exercise-item-selected" : "") +
          (isPending ? " exercise-card-pending " : "") +
          (isRejected ? " exercise-card-rejected" : "")
        }
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
      >
        {name}
      </div>
      {isRejected && (
        <div className="flex-ai-center exercises-rejected-container">
          <span className="color-light-gray">Request failed</span>
          <button
            className="padding-5 theme-btn-no-border"
            onClick={onRetryClick}
          >
            <i className="material-icons">refresh</i>
          </button>
        </div>
      )}
    </>
  );
};

const SelectedNavBar = ({
  setShowEditModal,
  selectedExercises,
  setShowDeleteModal,
  setSelectedExercises
}) => {
  let text = selectedExercises.length > 1 ? "exercises" : "exercise";

  return (
    <div className="width-100p flex-center-space-bw fixed exercises-mobile-selected-container">
      <div className="flex-ai-center exercises-mobile-check-n-span-wrapper">
        <button className="padding-5" onClick={() => setSelectedExercises([])}>
          <i className="material-icons-outlined">check</i>
        </button>
        <span className="exercises-mobile-selected-exercises-span black font-w-500 font-14">
          {selectedExercises.length} {text}
        </span>
      </div>

      <div className="flex-ai-center">
        {selectedExercises.length === 1 && (
          <button className="padding-5" onClick={() => setShowEditModal(true)}>
            <i className="material-icons-outlined">edit</i>
          </button>
        )}
        <button className="padding-5" onClick={() => setShowDeleteModal(true)}>
          <i className="material-icons-outlined">delete</i>
        </button>
      </div>
    </div>
  );
};

export default MobileExerciseView;
