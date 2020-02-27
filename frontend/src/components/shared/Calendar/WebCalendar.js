import React from "react";
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
  return (
    <SingleDatePicker
      date={date}
      focused={focused}
      onDateChange={onDateClick}
      onFocusChange={onFocusChange}
      isOutsideRange={() => false}
      renderDayContents={({ _d: date }) => {
        return (
          <div>
            {date.getDate()}
            {displayGroupCircle && displayGroupCircle(date)}
          </div>
        );
      }}
    />
  );
};

export default CalendarView;
