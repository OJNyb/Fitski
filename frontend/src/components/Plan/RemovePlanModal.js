import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ConfirmModal from "../shared/Modal/ConfirmModal";

const RemovePlanModal = ({ woPlan, hideModal }) => {
  const { name, _id: planId } = woPlan;
  const { push } = useHistory();
  function onSubmit() {
    axios
      .delete(`/api/user/access/${planId}`)
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
          Are you sure you want to remove
          <br />
          <span className="font-w-500">{name}?</span>
        </>
      }
      header={"Remove plan"}
      hideModal={hideModal}
      onSubmit={onSubmit}
    />
  );
};

export default RemovePlanModal;
