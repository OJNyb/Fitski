import React, { useState, useContext } from "react";
import Modal from "../shared/Modal/Modal";
import MobileRepeatModal from "./Mobile/RepeatWeekModal";
import { PlanContext } from "../../context/planContext";
import { repeatWeek } from "../../utils/planClient";
import useMobile from "../../hooks/useMobile";
import { useParams } from "react-router-dom";

const RepeatModal = ({ hideModal, currentWeek }) => {
  const { dispatch } = useContext(PlanContext);
  const [timesToRepeat, setTimesToRepeat] = useState(1);
  const isMobile = useMobile();
  const { plan_id: planId } = useParams();
  console.log(planId);

  function handleSubmit() {
    repeatWeek(dispatch, planId, timesToRepeat, currentWeek);
    hideModal();
  }

  return (
    <MobileRepeatModal
      hideModal={hideModal}
      onSubmit={handleSubmit}
      timesToRepeat={timesToRepeat}
      setTimesToRepeat={setTimesToRepeat}
    />
  );
  // let children = (
  //   <form className="repeat-week-form" onSubmit={onRepeatSubmit}>
  //     <input type="number" name="repeat" />
  //     <button className="theme-btn" type="submit">
  //       Confirm
  //     </button>
  //   </form>
  // );

  // return (
  //   <Modal header={"Repeat"} children={children} toggleModal={hideModal} />
  // );
};

export default RepeatModal;
