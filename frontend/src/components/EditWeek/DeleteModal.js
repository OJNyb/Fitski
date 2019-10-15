import React from "react";
import Modal from "../shared/Modal/Modal";

const DeleteModal = ({ onDelete, hideModal }) => {
  let children = (
    <div className="delete-week-btn-container">
      <button className="theme-btn-filled" onClick={() => onDelete("delete")}>
        Confirm
      </button>
      <button className="theme-btn" onClick={hideModal}>
        Cancel
      </button>
    </div>
  );

  return (
    <Modal header={"Delete week"} children={children} toggleModal={hideModal} />
  );
};

export default DeleteModal;
