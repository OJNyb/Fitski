import React, { useState } from "react";
import Modal from "../shared/Modal/Modal";
import { activatePlan } from "../../utils/historyClient";
import useMobile from "../../hooks/useMobile";

import CustomRadio from "../shared/Form/CustomRadio";
import "react-dates/initialize";
import { DayPicker } from "react-dates";
import { displayDate } from "../../utils/formatHistoryDate";

const ActivatePlanModal = ({ planId, hideModal }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const isMobile = useMobile();

  function onActivate() {
    activatePlan(planId, startDate);
  }

  function onDateChange(date) {
    setStartDate(new Date(date._d));
  }

  if (showCalendar) {
    if (isMobile) {
      return (
        <div className="mobile-calendar-container">
          <button
            className="history-mobile-cal-clear-btn"
            onClick={() => setShowCalendar(false)}
          >
            <i className="material-icons">clear</i>
          </button>
          <DayPicker
            onDayClick={date => {
              onDateChange(date);
              setShowCalendar(false);
            }}
            orientation={"vertical"}
            verticalHeight={Math.round(
              window.screen.height - (window.screen.height / 100) * 7
            )}
            transitionDuration={0}
          />
        </div>
      );
    }
  }

  let children = (
    <>
      <span className="activate-plan-span">Starting</span>
      <button
        className="activate-plan-date"
        onClick={() => setShowCalendar(true)}
        type="button"
      >
        {displayDate(startDate)}
      </button>
      {!isMobile && showCalendar && (
        <div className="bs-activate-plan-cal-contaioner">
          <DayPicker
            onDayClick={date => {
              onDateChange(date);
              setShowCalendar(false);
            }}
            transitionDuration={0}
          />
        </div>
      )}
      <button
        className="theme-btn-filled mobile-modal-submit-btn "
        onClick={onActivate}
      >
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
