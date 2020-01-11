import React, { useState, useContext } from "react";
import { PlanContext } from "../../context/planContext";
import { repeatWeek } from "../../utils/planClient";

import PlusMinusModal from "../shared/Modal/PlusMinusModal";

const RepeatModal = ({ hideModal, currentWeek }) => {
  const {
    state: { woPlan },
    dispatch
  } = useContext(PlanContext);
  const { _id: planId } = woPlan;
  const [timesToRepeat, setTimesToRepeat] = useState(1);

  function handleSubmit() {
    repeatWeek(dispatch, planId, timesToRepeat, currentWeek);
  }

  const { rwRejected, rwPending } = woPlan;

  function onClose() {
    delete woPlan.rwPending;
    delete woPlan.rwRejected;
    hideModal();
  }

  if (rwRejected === false && rwPending === false) {
    onClose();
  }

  return (
    <PlusMinusModal
      btnText={"Repeat"}
      value={timesToRepeat}
      header={"Repeat week"}
      onSubmit={handleSubmit}
      setValue={setTimesToRepeat}
      hideModal={onClose}
      isPending={rwPending}
      isRejected={rwRejected}
    />
  );
};

export default RepeatModal;
