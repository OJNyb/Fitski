import React, { useState } from "react";
import CalendarView from "../../shared/Calendar/MobileCalendar";
import MobileModal from "../../shared/Modal/MobileModal";
import { ensureDecimal } from "../../../utils/ensureDecimal";
import {
  displayDate,
  formatHistoryDate,
  reverseHistoryDate
} from "../../../utils/formatHistoryDate";

const CopyDayVIew = ({
  date,
  handleCopyDay,
  historyDays,
  setShowCopyView,
  displayGroupCircle
}) => {
  const [selectedDay, setSelectedDay] = useState(date);
  const [showSelectedDay, setShowSelectedDay] = useState(false);

  function handleDayClick(date) {
    const fDate = formatHistoryDate(new Date(date._d));
    const dayIndex = historyDays.map(x => x.date).indexOf(fDate);
    if (dayIndex === -1) {
      setSelectedDay({ date: fDate });
    } else {
      setSelectedDay(historyDays[dayIndex]);
    }
    setShowSelectedDay(true);
  }

  function handleCopySubmit() {
    handleCopyDay(selectedDay);
    setShowCopyView(false);
  }

  return (
    <>
      <CalendarView
        date={date}
        onDayClick={handleDayClick}
        setShowCalendar={setShowCopyView}
        displayGroupCircle={displayGroupCircle}
      />
      {showSelectedDay && (
        <SelectedDayModal
          selectedDay={selectedDay}
          setShowSelectedDay={setShowSelectedDay}
          onCopySubmit={handleCopySubmit}
        />
      )}
    </>
  );
};

const SelectedDayModal = ({
  onCopySubmit,
  selectedDay,
  setShowSelectedDay
}) => {
  const { date, exercises } = selectedDay;
  let header = `${displayDate(reverseHistoryDate(date))}`;
  let children;

  if (exercises) {
    const exercisesList = exercises.map(x => (
      <ExerciseItem key={x._id} exercise={x} />
    ));
    children = (
      <div className="width-100p border-box padding-0-10-77">
        {exercisesList}
        <div className="flex-ai-center">
          <button
            className="theme-btn-filled mobile-modal-submit-btn"
            onClick={onCopySubmit}
          >
            Copy
          </button>
        </div>
      </div>
    );
  } else {
    children = (
      <div className="flex-center font-14 color-gray">
        You haven't created a workout log for this day
      </div>
    );
  }

  return (
    <MobileModal
      header={header}
      children={children}
      toggleModal={() => setShowSelectedDay(false)}
    />
  );
};

const ExerciseItem = ({ exercise }) => {
  const {
    exercise: { name },
    sets
  } = exercise;
  let setsView = sets.map(x => {
    return <Column key={x._id} set={x} />;
  });
  return (
    <div className="history-mobile-exercise-history-day-container">
      <div className="history-mobile-exercise-input-header color-gray font-w-500 font-14">
        {name}
      </div>
      {setsView}
    </div>
  );
};

const Column = ({ set }) => {
  const { reps, weight } = set;
  return (
    <div className="history-mobile-exercise-history-column">
      <div className="history-mobile-exercise-list-label-wrapper">
        <b className="color-gray mr-1">{ensureDecimal(weight)}</b>
        <span className="black font-12 font-w-300">kgs</span>
      </div>
      <div className="history-mobile-exercise-list-label-wrapper">
        <b className="color-gray mr-1">{reps}</b>
        <span className="black font-12 font-w-300">reps</span>
      </div>
    </div>
  );
};

export default CopyDayVIew;
