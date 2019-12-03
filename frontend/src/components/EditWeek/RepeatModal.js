import React, { useState, useContext } from "react";
import { PlanContext } from "../../context/planContext";
import { repeatWeek } from "../../utils/planClient";
import { useParams } from "react-router-dom";

import PlusMinusModal from "../shared/Modal/PlusMinusModal";

const RepeatModal = ({ hideModal, currentWeek }) => {
  const { dispatch } = useContext(PlanContext);
  const [timesToRepeat, setTimesToRepeat] = useState(1);
  const { plan_id: planId } = useParams();
  function handleSubmit() {
    repeatWeek(dispatch, planId, timesToRepeat, currentWeek);
    hideModal();
  }

  return (
    <PlusMinusModal
      btnText={"Confirm"}
      value={timesToRepeat}
      hideModal={hideModal}
      header={"Repeat week"}
      onSubmit={handleSubmit}
      setValue={setTimesToRepeat}
    />
  );
};

export default RepeatModal;
