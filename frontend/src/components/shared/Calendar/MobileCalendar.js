import React from "react";
import { isSameDay } from "../../../utils/formatHistoryDate";
import { DayPicker } from "react-dates";
import useSetLoading from "../../../hooks/useSetLoading";
import "react-dates/initialize";

import "./MobileCalendar.css";
import "react-dates/lib/css/_datepicker.css";
import "./Calendar.css";

const CalendarView = ({
  date,
  onDayClick,
  setShowCalendar,
  displayGroupCircle
}) => {
  const { _d } = date;

  useSetLoading(false);
  return (
    <div className="fixed z-max width-100p top-0">
      <div className="height-50 width-100p padding-0-5 flex-ai-center bc-a6">
        <button
          className="color-white padding-5"
          onClick={() => setShowCalendar(false)}
        >
          <i className="material-icons">arrow_back</i>
        </button>
      </div>
      <div className="mobile-calendar-container">
        <DayPicker
          onDayClick={onDayClick}
          numberOfMonths={3}
          orientation={"vertical"}
          verticalHeight={Math.round(
            window.screen.height - (window.screen.height / 100) * 7
          )}
          transitionDuration={150}
          renderDayContents={({ _d: date }) => {
            let y = isSameDay(date, _d);
            return (
              <div
                className={
                  "mobile-calendar-day" +
                  (y ? " mobile-calendar-day-active" : "")
                }
              >
                {date.getDate()}
                {displayGroupCircle && displayGroupCircle(date)}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default CalendarView;
