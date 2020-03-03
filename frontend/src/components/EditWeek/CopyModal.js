import React, { useState, useContext } from "react";
import { copyWeek } from "../../utils/planClient";
import { PlanContext } from "../../context/planContext";
import useMobile from "../../hooks/useMobile";

import Modal from "../shared/Modal/Modal";
import ErrorMessage from "../shared/Modal/ErrorMessage";
import { getDisplayUnits } from "../../utils/cardUtils";

const CopyModal = ({ weekIndex, hideModal }) => {
  const {
    state: { woPlan },
    dispatch
  } = useContext(PlanContext);
  const { _id: planId, weeks } = woPlan;
  const currentWeek = weeks[weekIndex];
  const { _id: weekId } = currentWeek;

  function handleSubmit(copyWeekIndex) {
    if (copyWeekIndex === weekIndex) return;
    copyWeek(dispatch, planId, weekId, weeks[copyWeekIndex]);
  }

  const { cwRejected, cwPending } = woPlan;

  function onClose() {
    delete woPlan.cwPending;
    delete woPlan.cwRejected;
    hideModal();
  }

  if (cwRejected === false && cwPending === false) {
    onClose();
  }

  return (
    <CopyWeekModal
      weeks={weeks}
      hideModal={onClose}
      onSubmit={handleSubmit}
      isRejected={cwRejected}
      isPending={cwPending}
      weekIndex={weekIndex}
    />
  );
};

const CopyWeekModal = ({
  weeks,
  onSubmit,
  hideModal,
  isPending,
  isRejected,
  weekIndex,
  copyWeekIndex
}) => {
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
    <>
      {isRejected && (
        <ErrorMessage message="Request failed, please try again" />
      )}
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
            (isMobile ? "mobile-modal-submit-btn" : "web-modal-submit-btn")
          }
          onClick={() => {
            onSubmit(selected - 1);
          }}
          disabled={isPending || selected - 1 === weekIndex}
        >
          Copy
        </button>
      </div>
    </>
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
    exercise: { name, unit }
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

  const { lastRowUnit } = getDisplayUnits(unit);

  return (
    <div className="padding-5 flex-ai-center color-gray">
      <span className="font-w-500 space-after font-14">{name}</span> -{" "}
      {sets.length} sets
      {lastRowUnit && (
        <>
          {" "}
          of {displayReps || 0} {lastRowUnit}
        </>
      )}
    </div>
  );
};

export default CopyModal;
