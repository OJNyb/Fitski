import React from "react";
import Modal from "./Modal";

const ConfirmModal = ({ text, header, onSubmit, hideModal }) => {
  let children = (
    <div className="width-100p padding-s-10 border-box flex-col-cen relative">
      <p>{text}</p>
      <div className="flex-ai-center modal-mobile-delete-btn-container">
        <button
          className="theme-btn-filled mobile-modal-delete-btn padding-5 margin-0-10"
          onClick={onSubmit}
        >
          Confirm
        </button>
        <button className="cancel-btn" onClick={hideModal}>
          Cancel
        </button>
      </div>
    </div>
  );

  return <Modal header={header} children={children} toggleModal={hideModal} />;
};

export default ConfirmModal;
