import React from "react";
import { isSameDay } from "../../../utils/formatHistoryDate";
import { DayPicker } from "react-dates";
import useSetLoading from "../../../hooks/useSetLoading";

const CalendarView = ({
  date,
  onDayClick,
  setShowHistory,
  displayGroupCircle
}) => {
  const { _d } = date;

  useSetLoading(false);
  return (
    <>
      <div className="fixed z-max height-7vh width-100p top-0 padding-0-5 flex-ai-center bc-a6">
        <button
          className="color-white padding-5"
          onClick={() => setShowHistory(false)}
        >
          <i className="material-icons">arrow_back</i>
        </button>
      </div>
      <div className="history-mobile-calendar-container">
        <DayPicker
          onDayClick={onDayClick}
          numberOfMonths={2}
          orientation={"vertical"}
          verticalHeight={Math.round(
            window.screen.height - (window.screen.height / 100) * 7
          )}
          transitionDuration={0}
          renderDayContents={({ _d: date }) => {
            let y = isSameDay(date, _d);
            return (
              <div
                className={
                  "history-mobile-calendar-day" +
                  (y ? " history-mobile-calendar-day-active" : "")
                }
              >
                {date.getDate()} {displayGroupCircle(date)}
              </div>
            );
          }}
        />
      </div>
    </>
  );
};

export default CalendarView;
