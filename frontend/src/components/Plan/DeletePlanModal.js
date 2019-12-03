import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ConfirmModal from "../shared/Modal/ConfirmModal";

const DeletePlanModal = ({ woPlan, hideModal }) => {
  const { name, _id: planId } = woPlan;
  const { push } = useHistory();
  function onDelete() {
    axios
      .delete(`/plan/${planId}`)
      .then(res => {
        const { data } = res;
        const { message } = data;
        if (message === "success") {
          push("/plans");
        } else {
          console.log("err");
        }
      })
      .catch(err => console.log(err.response));
  }

  return (
    <ConfirmModal
      text={
        <>
          Are you sure you want to delete
          <br />
          <span className="font-w-500">{name}?</span>
        </>
      }
      header={"Delete plan"}
      hideModal={hideModal}
      onSubmit={() => onDelete("delete")}
    />
  );
};

export default DeletePlanModal;
