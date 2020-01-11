import React, { useState, useContext } from "react";
import { PlanContext } from "../../context/planContext";
import { addWeeks } from "../../utils/planClient";

import PlusMinusModal from "../shared/Modal/PlusMinusModal";

const AddWeeksModal = ({ planId, hideModal }) => {
  const {
    state: { woPlan },
    dispatch
  } = useContext(PlanContext);
  const [weeks, setWeeks] = useState(1);

  const { awRejected, awPending } = woPlan;

  function onClose() {
    delete woPlan.awPending;
    delete woPlan.awRejected;
    hideModal();
  }

  if (awRejected === false && awPending === false) {
    onClose();
  }

  function onSubmit() {
    addWeeks(dispatch, planId, weeks);
  }

  return (
    <PlusMinusModal
      value={weeks}
      setValue={setWeeks}
      header={"Add weeks"}
      btnText={"Add"}
      onSubmit={onSubmit}
      hideModal={onClose}
      isPending={awPending}
      isRejected={awRejected}
    />
  );
};

export default AddWeeksModal;
