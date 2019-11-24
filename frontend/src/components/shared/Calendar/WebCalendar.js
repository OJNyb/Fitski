import React from "react";
import { isSameDay } from "../../../utils/formatHistoryDate";
import "react-dates/initialize";

import { SingleDatePicker } from "react-dates";

import "./WebCalendar.css";
import "react-dates/lib/css/_datepicker.css";
import "./Calendar.css";

const CalendarView = ({
  date,
  focused,
  onDateClick,
  onFocusChange,
  displayGroupCircle
}) => {
  const { _d } = date;

  return (
    <SingleDatePicker
      date={date}
      focused={focused}
      id="your_unique_id"
      onDateChange={onDateClick}
      onFocusChange={onFocusChange}
      isOutsideRange={() => false}
      renderDayContents={({ _d: date }) => {
        let y = isSameDay(date, _d);
        return (
          <div
            className={
              "mobile-calendar-day" + (y ? " mobile-calendar-day-active" : "")
            }
          >
            {date.getDate()}
            {displayGroupCircle && displayGroupCircle(date)}
          </div>
        );
      }}
    />
  );
};

export default CalendarView;
