import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { copyWeek } from "../../utils/planClient";
import { PlanContext } from "../../context/planContext";
import useMobile from "../../hooks/useMobile";

import Modal from "../shared/Modal/Modal";

const CopyModal = ({ weeks, weekIndex, hideModal }) => {
  const { plan_id: planId } = useParams();
  const { dispatch } = useContext(PlanContext);
  const currentWeek = weeks[weekIndex];
  const { _id: weekId } = currentWeek;

  function handleSubmit(copyWeekIndex) {
    if (copyWeekIndex === weekIndex) return;
    copyWeek(dispatch, planId, weekId, weeks[copyWeekIndex]);
    hideModal();
  }

  return (
    <MobileCopyWeek
      weeks={weeks}
      hideModal={hideModal}
      onSubmit={handleSubmit}
    />
  );
};

const MobileCopyWeek = ({ weeks, hideModal, onSubmit }) => {
  const isMobile = useMobile();

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
        className={
          "theme-btn-filled " +
          (isMobile ? "mobile-modal-submit-btn" : "bs-modal-submit-btn")
        }
        onClick={() => {
          onSubmit(selected - 1);
        }}
      >
        Copy
      </button>
    </div>
  );

  return (
    <Modal header={"Copy week"} children={children} toggleModal={hideModal} />
  );
};

const Week = ({ week }) => {
  const isMobile = useMobile();
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
    <div
      className={
        "edit-week-copy-week-selected-week-container custom-scrollbar" +
        (isMobile
          ? " padding-0-10-77 edit-week-mobile-copy-week-selected-week-container"
          : "")
      }
    >
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
      <div className="edit-week-copy-week-day-header black font-w-700 font-14">
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
      <span className="font-w-500 space-after font-14">{name}</span> -{" "}
      {sets.length} sets of {displayReps || 0} reps
    </div>
  );
};

export default CopyModal;
