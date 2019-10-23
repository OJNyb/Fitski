import React, { useState } from "react";
import Modal from "../shared/Modal/Modal";
import { activatePlan } from "../../utils/historyClient";

import Calendar from "react-calendar";

const ActivatePlanModal = ({ planId, hideModal }) => {
  const [radio, setRadio] = useState("today");
  const [startDate, setStartDate] = useState(new Date());

  function onActivate() {
    activatePlan(planId, startDate);
  }

  function onDateChange(date) {
    setStartDate(date);
  }

  function onChange(e) {
    setRadio(e.target.value);
  }

  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  let children = (
    <>
      <form>
        <input
          type="radio"
          name="date"
          value="today"
          checked={radio === "today"}
          onChange={onChange}
        />{" "}
        Today
        <input
          type="radio"
          name="date"
          value="tomorrow"
          checked={radio === "tomorrow"}
          onChange={onChange}
        />{" "}
        Tomorrow
        <input
          type="radio"
          name="date"
          value="pick"
          checked={radio === "pick"}
          onChange={onChange}
        />{" "}
        Pick
      </form>
      {radio === "pick" && (
        <div className="activate-plan-calendar-container">
          <Calendar onChange={onDateChange} value={startDate} />
        </div>
      )}

      <button className="theme-btn-filled" onClick={onActivate}>
        Activate
      </button>
    </>
  );

  return (
    <Modal
      header={"Activate plan"}
      children={children}
      toggleModal={hideModal}
    />
  );
};

export default ActivatePlanModal;
