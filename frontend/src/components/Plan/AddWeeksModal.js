import React, { useState, useContext } from "react";
import Modal from "../shared/Modal/Modal";
import { PlanContext } from "../../context/planContext";
import useMobile from "../../hooks/useMobile";
import { addWeeks } from "../../utils/planClient";
import Plus24 from "../shared/SVGs/Plus24";
import Minus24 from "../shared/SVGs/Minus24";

const AddWeeksModal = ({ planId, hideModal }) => {
  const { dispatch } = useContext(PlanContext);
  const [weeks, setWeeks] = useState(1);
  const [isSubmitting, setSubmitting] = useState(false);
  const isMobile = useMobile();

  function onSubmit() {
    addWeeks(dispatch, planId, weeks);
    hideModal();
  }

  function onWeekChange(e) {
    const { value, validity } = e.target;
    if (validity.valid && value % 1 === 0 && value < 100) setWeeks(value);
  }
  let children = (
    <div
      className={isMobile ? "add-weeks-modal-mobile-container" : "flex-col-cen"}
    >
      <div className="add-weeks-modal-mobile-input-wrapper">
        <button
          onClick={() => {
            if (weeks > 0) setWeeks(Number(weeks) - 1);
          }}
        >
          <Minus24 fill={"#a60000"} />
        </button>
        <div className="add-weeks-modal-mobile-input-shiizz">
          <input
            type="tel"
            value={weeks}
            onChange={onWeekChange}
            pattern="^[0-9]\d*\.?\d*$"
          />
          <div className="border-with-sides" />
        </div>
        <button onClick={() => setWeeks(Number(weeks) + 1)}>
          <Plus24 fill={"#a60000"} />
        </button>
      </div>

      <button
        disabled={isSubmitting}
        className={
          "theme-btn-filled " +
          (isMobile ? "mobile-modal-submit-btn" : "bs-modal-submit-btn")
        }
        onClick={onSubmit}
      >
        Add
      </button>
    </div>
  );

  return (
    <Modal header={"Add weeks"} children={children} toggleModal={hideModal} />
  );
};

const AddWeeksMobile = ({ onSubmit }) => {
  const [weeks, setWeeks] = useState(1);
  const [isSubmitting, setSubmitting] = useState(false);

  function onWeekChange(e) {
    const { value, validity } = e.target;
    if (validity.valid && value % 1 === 0 && value < 100) setWeeks(value);
  }
  return (
    <div className="add-weeks-modal-mobile-container">
      <div className="add-weeks-modal-mobile-input-wrapper">
        <button
          onClick={() => {
            if (weeks > 0) setWeeks(Number(weeks) - 1);
          }}
        >
          <div className="minus-container">
            <div />
          </div>
        </button>
        <div className="add-weeks-modal-mobile-input-shiizz">
          <input
            type="tel"
            value={weeks}
            onChange={onWeekChange}
            pattern="^[0-9]\d*\.?\d*$"
          />
          <div className="border-with-sides" />
        </div>
        <button onClick={() => setWeeks(Number(weeks) + 1)}>
          <div className="plus-container">
            <div />
            <div />
          </div>
        </button>
      </div>

      <button
        disabled={isSubmitting}
        className="theme-btn-filled mobile-modal-submit-btn"
        onClick={() => {
          setSubmitting(true);
          onSubmit({ numberOfWeeks: weeks }, { setSubmitting });
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddWeeksModal;
