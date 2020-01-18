import React from "react";
import Modal from "../Modal/Modal";
import useMobile from "../../../hooks/useMobile";

const DeleteExerciseModal = ({ onSubmit, exercises, hideModal }) => {
  const isMobile = useMobile();
  let exerciseItems = exercises.map(x => (
    <ExerciseItem exercise={x} key={x._id} />
  ));

  console.log(exercises);

  let children = (
    <div className="width-100p padding-s-10 border-box flex-col-cen relative">
      <div className="mb-30">{exerciseItems}</div>
      <div
        className={
          "flex-ai-center" +
          (isMobile ? " modal-mobile-delete-btn-container" : "")
        }
      >
        <button
          className="theme-btn-filled mobile-modal-delete-btn padding-5 margin-0-10"
          onClick={() => onSubmit(exercises.map(x => x._id))}
        >
          Delete
        </button>
        <button
          className="cancel-btn mobile-modal-delete-btn margin-0-10"
          onClick={hideModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      header={"Delete Exercises"}
      children={children}
      toggleModal={hideModal}
    />
  );
};

const ExerciseItem = ({ exercise }) => {
  const { name } = exercise;
  return <div className="black font-16 flex-center">{name}</div>;
};

export default DeleteExerciseModal;
