import React from "react";
import { isSameDay } from "../../../utils/formatHistoryDate";
import { DayPicker } from "react-dates";
import useSetLoading from "../../../hooks/useSetLoading";
import "react-dates/initialize";
import useSetNav from "../../../hooks/useSetNav";

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
  useSetNav({
    showDehaze: false,
    onBackClick: () => setShowCalendar(false),
    backClickId: "calendarView1",
    text: "Calendar"
  });
  return (
    <div className="fixed z-low-mid width-100p top-0">
      <div className="mobile-calendar-container pt-50">
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
