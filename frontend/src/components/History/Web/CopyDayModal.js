import React, { useState } from "react";
import WebCalendar from "../../shared/Calendar/WebCalendar";
import moment from "moment";
import WebModal from "../../shared/Modal/WebModal";
import { formatHistoryDate } from "../../../utils/formatHistoryDate";

import { ExerciseText } from "../ExerciseText";

const CopyDayModal = ({
  historyDays,
  setShowModal,
  onCopyDay,
  displayGroupCircle
}) => {
  const [date, setDate] = useState(new moment());
  const [focused, setFocused] = useState(false);

  function onCopySubmit() {
    onCopyDay(historyDays[dayIndex]);
    setShowModal(false);
  }

  let dayIndex = historyDays
    .map(x => x.date)
    .indexOf(formatHistoryDate(date._d));

  let selectedDay;
  if (dayIndex === -1) {
    selectedDay = false;
  } else {
    selectedDay = historyDays[dayIndex];
  }
  let dayView = <SelectedDay selectedDay={selectedDay} />;

  const children = (
    <div className="flex-col-cen history-copy-day-modal-container">
      <WebCalendar
        date={date}
        focused={focused}
        onDateClick={d => setDate(d)}
        displayGroupCircle={displayGroupCircle}
        onFocusChange={({ focused }) => setFocused(focused)}
      />
      {dayView}
      <button
        disabled={dayIndex === -1}
        className="theme-btn-filled web-modal-submit-btn"
        onClick={onCopySubmit}
      >
        Copy
      </button>
    </div>
  );

  return (
    <WebModal
      header={"Copy day"}
      children={children}
      toggleModal={() => setShowModal(false)}
    />
  );
};

const SelectedDay = ({ selectedDay }) => {
  const { exercises } = selectedDay;

  let children;

  if (exercises) {
    const exercisesList = exercises.map(x => (
      <ExerciseText key={x._id} exercise={x} />
    ));
    children = (
      <div className="width-100p border-box">
        {exercisesList}
        <div className="flex-ai-center"></div>
      </div>
    );
  } else {
    children = (
      <div className="flex-center font-14 color-gray">
        You haven't created a workout log for this day
      </div>
    );
  }

  return <div className="margin-top-10 width-100p">{children}</div>;
};

export default CopyDayModal;
