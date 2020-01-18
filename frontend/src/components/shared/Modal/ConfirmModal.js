import React from "react";
import Modal from "./Modal";
import ErrorMessage from "./ErrorMessage";

const ConfirmModal = ({
  text,
  header,
  onSubmit,
  hideModal,
  isPending,
  isRejected
}) => {
  let children = (
    <div className="width-100p padding-s-10 border-box flex-col-cen relative">
      {isRejected && (
        <ErrorMessage message="Request failed, please try again" />
      )}
      <p className="text-center width-80p confirm-modal-p">{text}</p>
      <div className="flex-ai-center modal-mobile-delete-btn-container">
        <button
          className="theme-btn-filled mobile-modal-delete-btn padding-5 margin-0-10"
          onClick={onSubmit}
          disabled={isPending}
        >
          Confirm
        </button>
        <button
          className="cancel-btn padding-5 margin-0-10"
          onClick={hideModal}
          disabled={isPending}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return <Modal header={header} children={children} toggleModal={hideModal} />;
};

export default ConfirmModal;
