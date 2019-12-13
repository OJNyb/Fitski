import React from "react";
import MobileModal from "../../Modal/MobileModal";

const DeleteExerciseModal = ({
  onDeleteSubmit,
  selectedExercises,
  setShowDeleteModal
}) => {
  let ExercisesToDeleteView = selectedExercises.map(x => (
    <ExerciseItem exercise={x} key={x._id} />
  ));
  let children = (
    <div className="flex-col-cen width-100p padding-0-10-77">
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
  const { name } = exercise;
  return <div className="black font-16">{name}</div>;
};

export default DeleteExerciseModal;
