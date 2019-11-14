import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import MobileCopyWeek from "./Mobile/CopyWeekModal";
import { copyWeek } from "../../utils/planClient";
import { PlanContext } from "../../context/planContext";

const CopyModal = ({ weeks, weekIndex, hideModal }) => {
  const { plan_id: planId } = useParams();
  const { dispatch } = useContext(PlanContext);
  const currentWeek = weeks[weekIndex];
  const { _id: weekId } = currentWeek;

  function handleSubmit(copyWeekIndex) {
    if (copyWeekIndex === weekIndex) return;
    copyWeek(dispatch, planId, weekId, weeks[copyWeekIndex]);
    hideModal();
  }

  return (
    <MobileCopyWeek
      weeks={weeks}
      hideModal={hideModal}
      onSubmit={handleSubmit}
    />
  );
};

export default CopyModal;
