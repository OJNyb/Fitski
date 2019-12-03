import React from "react";

import ConfirmModal from "../shared/Modal/ConfirmModal";

const DeleteModal = ({ handleSubmit, hideModal }) => {
  return (
    <ConfirmModal
      text={"Are you sure you want to delete this week?"}
      header={"Delete week"}
      onSubmit={handleSubmit}
      hideModal={hideModal}
    />
  );
};

export default DeleteModal;
