import React, { useState, useContext } from "react";
import { PlanContext } from "../../context/planContext";
import { addWeeks } from "../../utils/planClient";

import PlusMinusModal from "../shared/Modal/PlusMinusModal";

const AddWeeksModal = ({ planId, hideModal }) => {
  const { dispatch } = useContext(PlanContext);
  const [weeks, setWeeks] = useState(1);

  function onSubmit() {
    addWeeks(dispatch, planId, weeks);
    hideModal();
  }

  return (
    <PlusMinusModal
      value={weeks}
      setValue={setWeeks}
      header={"Add weeks"}
      btnText={"Add"}
      onSubmit={onSubmit}
      hideModal={hideModal}
    />
  );
};

export default AddWeeksModal;
