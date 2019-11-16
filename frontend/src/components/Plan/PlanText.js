import React from "react";
import { Link } from "react-router-dom";
import useMobile from "../../hooks/useMobile";

import "./planText.css";

const PlanText = ({ week, index, planId }) => {
  const { days, _id: weekId } = week;

  let exercises = days
    .map(x => x.exercises)
    .reduce((accu, curr) => (accu += curr.length), 0);

  let daysDisplay;

  if (exercises) {
    daysDisplay = days.map((day, index) => (
      <Day day={day} index={index} key={day._id} />
    ));
  } else {
    daysDisplay = <p className="margin-0">Rest Week</p>;
  }

  return (
    <div className="plan-week-container flex-col-cen">
      <Link to={`/plans/${planId}/${weekId}`}>
        <h1 className="theme-btn-hover tc font-fam-babas font-40">
          WEEK {index + 1}
        </h1>
      </Link>
      <div className="plan-days-container">{daysDisplay}</div>
    </div>
  );
};

const Day = ({ day, index }) => {
  const { exercises } = day;
  const isMobile = useMobile();

  if (!exercises.length) return null;
  const exerciseDisplay = exercises.map(exercise => (
    <Exercise exercise={exercise} key={exercise._id} />
  ));
  return (
    <div className="plan-day-container flex-col-cen">
      <h2 className="margin-0 color-gray font-30 font-fam-babas">
        DAY {index + 1}
      </h2>
      <div
        className={
          "plan-exercises-container" + (isMobile ? "" : " border-left-2-theme")
        }
      >
        {exerciseDisplay}
      </div>
    </div>
  );
};

const Exercise = ({ exercise }) => {
  const isMobile = useMobile();
  if (!exercise.exercise) return null;

  let {
    exercise: { name },
    sets
  } = exercise;

  const { length } = sets;

  let setText = "set";
  if (length !== 1) {
    setText += "s";
  }
  let reps = sets.map(x => x.reps);

  let displayReps;
  if (Math.max(...reps) === Math.min(...reps)) {
    displayReps = reps[0];
  } else {
    displayReps = reps.reduce((accu, curr, i) => {
      accu += `${curr}`;
      if (i !== reps.length - 1) {
        accu += ", ";
      }
      return accu;
    }, "");
  }

  let view;

  if (isMobile) {
    view = (
      <ExerciseMobile
        name={name}
        length={length}
        setText={setText}
        displayReps={displayReps}
      />
    );
  } else {
    view = (
      <ExerciseWeb
        name={name}
        length={length}
        setText={setText}
        displayReps={displayReps}
      />
    );
  }

  return <>{view}</>;
};

const ExerciseMobile = ({ name, length, setText, displayReps }) => {
  return (
    <div className="plan-exercise-container plan-mobile-exercise-container color-gray flex-center font-fam-oswald">
      <div className="font-15 font-w-500 mr-1">
        {name}
        {" - "}
      </div>

      {/* <span>
        <span className="mr-1">{length || 0}</span>
        <span className="font-w-400 color-light-gray font-12">{setText}</span>
      </span>
      <span>
        <span className="mr-1">{displayReps || 0}</span>
        <span className="font-w-400 color-light-gray font-12">reps</span>
      </span> */}
      <span className="font-15">
        {length || 0} {setText} of {displayReps || 0} reps
      </span>
      {/* <span className="plan-exercise-volume">
      {sets || 0} x {reps || 0}
    </span> */}
    </div>
  );
};

const ExerciseWeb = ({ name, length, setText, displayReps }) => {
  return (
    <div className="plan-exercise-container plan-web-exercise-container flex-center-space-bw">
      <div className="font-15 font-w-500">
        {name} -{" "}
        <div className="inline-block">
          <b>{length || 0}</b> {setText} of <b>{displayReps || 0}</b> reps
        </div>
      </div>

      {/* <span className="plan-exercise-volume">
      {sets || 0} x {reps || 0}
    </span> */}
    </div>
  );
};

export default PlanText;
