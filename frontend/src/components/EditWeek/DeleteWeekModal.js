import React, { useContext } from "react";
import { PlanContext } from "../../context/planContext";

import ConfirmModal from "../shared/Modal/ConfirmModal";

const DeleteModal = ({ hideModal, handleSubmit }) => {
  const {
    state: { woPlan }
  } = useContext(PlanContext);

  const { dwPending, dwRejected } = woPlan;

  function onClose() {
    delete woPlan.dwPending;
    delete woPlan.dwRejected;
    hideModal();
  }

  return (
    <ConfirmModal
      text={"Are you sure you want to delete this week?"}
      header={"Delete week"}
      onSubmit={handleSubmit}
      hideModal={onClose}
      isPending={dwPending}
      isRejected={dwRejected}
    />
  );
};

export default DeleteModal;
