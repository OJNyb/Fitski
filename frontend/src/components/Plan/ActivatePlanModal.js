import React, { useState } from "react";
import Modal from "../shared/Modal/Modal";
import { activatePlan } from "../../utils/historyClient";
import useMobile from "../../hooks/useMobile";
import CalendarView from "../shared/Calendar/MobileCalendar";

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
    hideModal();
  }

  function onDateChange(date) {
    setStartDate(new Date(date._d));
  }

  if (showCalendar) {
    if (isMobile) {
      return (
        <CalendarView
          onDayClick={date => {
            onDateChange(date);
            setShowCalendar(false);
          }}
          date={{ _d: startDate }}
          setShowCalendar={setShowCalendar}
        />
      );
    }
  }

  let children = (
    <div className="padding-0-10-77 flex-col-cen">
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
    </div>
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
