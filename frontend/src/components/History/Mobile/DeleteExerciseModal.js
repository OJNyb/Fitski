import React from "react";
import MobileModal from "../../shared/Modal/MobileModal";

const DeleteExerciseModal = ({
  exercises,
  onDeleteSubmit,
  selectedExercises,
  setShowDeleteModal
}) => {
  const exercisesToShow = exercises.filter(
    x => selectedExercises.indexOf(x._id) > -1
  );

  let ExercisesToDeleteView = exercisesToShow.map(x => (
    <ExerciseItem exercise={x} key={x._id} />
  ));

  let children = (
    <div className="flex-col-cen width-100p">
      {ExercisesToDeleteView}
      <button
        className="theme-btn-filled mobile-modal-submit-btn"
        onClick={onDeleteSubmit}
      >
        Delete
      </button>
    </div>
  );
  return (
    <MobileModal
      children={children}
      header={"Delete exercises"}
      toggleModal={() => setShowDeleteModal(false)}
    />
  );
};

const ExerciseItem = ({ exercise }) => {
  const {
    exercise: { name }
  } = exercise;
  return <span className="black font-16">{name}</span>;
};

export default DeleteExerciseModal;
