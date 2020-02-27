import React, { useState } from "react";
import Modal from "./Modal";
import useMobile from "../../../hooks/useMobile";
import CalendarView from "../Calendar/MobileCalendar";
import { isSameDay } from "../../../utils/formatHistoryDate";
import "react-dates/initialize";
import { DayPicker } from "react-dates";
import { displayDate } from "../../../utils/formatHistoryDate";

const ActivatePlanModal = ({ hideModal, onActivateSubmit }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const isMobile = useMobile();

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

  let sharedText = (
    <>
      <span className="font-w-300 font-14 black">Starting</span>
      <button
        className="tc margin-0 font-w-300 font-30"
        onClick={() => setShowCalendar(true)}
        type="button"
      >
        {displayDate(startDate)}
      </button>
    </>
  );
  let children;
  if (isMobile) {
    children = (
      <div className="padding-0-10-77 flex-col-cen">
        {sharedText}
        <button
          className="theme-btn-filled mobile-modal-submit-btn"
          onClick={() => onActivateSubmit(startDate)}
        >
          Activate
        </button>
      </div>
    );
  } else {
    children = (
      <div className="flex-col-cen">
        {sharedText}
        {showCalendar && (
          <div className="bs-activate-plan-cal-container">
            <DayPicker
              onDayClick={date => {
                onDateChange(date);
                setShowCalendar(false);
              }}
              transitionDuration={0}
              renderDayContents={({ _d: date }) => {
                let y = isSameDay(date, startDate);
                return (
                  <div
                    className={
                      "mobile-calendar-day" +
                      (y ? " mobile-calendar-day-active" : "")
                    }
                  >
                    {date.getDate()}
                  </div>
                );
              }}
            />
          </div>
        )}
        <button
          className="theme-btn-filled web-modal-submit-btn"
          onClick={() => onActivateSubmit(startDate)}
        >
          Activate
        </button>
      </div>
    );
  }

  return (
    <Modal
      header={"Activate plan"}
      children={children}
      toggleModal={hideModal}
    />
  );
};

export default ActivatePlanModal;
