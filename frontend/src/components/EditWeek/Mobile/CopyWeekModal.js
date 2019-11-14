import React, { useState } from "react";
import MobileModal from "../../shared/Modal/MobileModal";
import { withRouter } from "react-router-dom";

const CopyModal = ({ weeks, hideModal, onSubmit }) => {
  const [selected, setSelected] = useState(1);

  const currentWeek = weeks[selected - 1];

  function onIncDecClick(value) {
    const newValue = Number(selected) + value;
    if (newValue <= weeks.length && newValue >= 1) {
      setSelected(newValue);
    }
  }

  let weekView;
  if (currentWeek) {
    weekView = <Week key={currentWeek._id} week={currentWeek} />;
  } else {
    weekView = <p>No week selected</p>;
  }

  let children = (
    <div className="width-100p padding-s-10 border-box flex-col relative">
      <div className="fixed bc-white margin-a edit-week-copy-select-week-wrapper">
        <div className="flex-center">
          <button
            className="theme-btn-no-border"
            onClick={() => {
              onIncDecClick(-1);
            }}
            disabled={selected === 1}
          >
            <i className="material-icons">keyboard_arrow_left</i>
          </button>

          <button className="font-21 black">{selected}</button>

          <button
            className="theme-btn-no-border"
            onClick={() => onIncDecClick(1)}
            disabled={selected === weeks.length}
          >
            <i className="material-icons">keyboard_arrow_right</i>
          </button>
        </div>
      </div>

      {weekView}
      <button
        className={"theme-btn-filled mobile-modal-submit-btn"}
        onClick={() => {
          onSubmit(selected - 1);
        }}
      >
        Copy
      </button>
    </div>
  );

  return (
    <MobileModal
      header={"Copy week"}
      children={children}
      toggleModal={hideModal}
    />
  );
};

const Week = ({ week }) => {
  const { days } = week;

  const isExercises =
    days.reduce((prev, curr) => {
      if (curr.exercises.length) return ++prev;
      return prev;
    }, 0) > 0;

  let dayView;
  if (isExercises) {
    dayView = days.map((x, y) => <Day day={x} index={y} key={x._id} />);
  } else {
    dayView = <p className="text-center">No exercises for selected week</p>;
  }

  return (
    <div className="edit-week-mobile-copy-week-selected-week-container padding-0-10-77">
      {dayView}
    </div>
  );
};

const Day = ({ day, index }) => {
  const { exercises } = day;
  if (!exercises.length) return null;
  let exerciseView = exercises.map(x => <Exercise exercise={x} key={x._id} />);
  return (
    <div className="margin-top-10">
      <div className="edit-week-mobile-copy-week-day-header black font-w-700 font-14">
        DAY {index + 1}
      </div>
      {exerciseView}
    </div>
  );
};

const Exercise = ({ exercise }) => {
  const {
    sets,
    exercise: { name }
  } = exercise;
  const reps = sets.map(x => x.reps);

  let displayReps;
  if (Math.max(...reps) === Math.min(...reps)) {
    displayReps = reps[0];
  } else {
    displayReps = reps.reduce((accu, curr, i) => {
      if (!curr) curr = 0;
      accu += `${curr}`;
      if (i !== reps.length - 1) {
        accu += ", ";
      }
      return accu;
    }, "");
  }

  return (
    <div className="padding-5 flex-ai-center color-gray">
      <span className="font-w-500 space-after">{name}</span> - {sets.length}{" "}
      sets of {displayReps || 0} reps
    </div>
  );
};

export default withRouter(CopyModal);
