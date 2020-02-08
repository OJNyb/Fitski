import React from "react";
import { Link } from "react-router-dom";
import useMobile from "../../hooks/useMobile";

import "./planText.css";

const PlanText = ({ week, index, isSelf, planId }) => {
  const isMobile = useMobile();
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

  let weekHeader;
  if (isSelf) {
    weekHeader = (
      <Link to={`/plans/${planId}/${weekId}`}>
        <h1 className="tc font-fam-babas font-40 plan-text-week-header-link noselect">
          WEEK {index + 1}
        </h1>
      </Link>
    );
  } else {
    weekHeader = (
      <h1 className="tc font-fam-babas font-40">WEEK {index + 1}</h1>
    );
  }

  return (
    <div
      className={
        "plan-week-container " + "flex-col-cen"
        //  +
        // (isMobile ? "flex-col-cen" : "plan-web-week-container")
      }
    >
      {weekHeader}
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
    <div className={"plan-day-container flex-col-cen"}>
      <h2 className="margin-0 color-gray font-30 font-fam-babas">
        DAY {index + 1}
      </h2>
      <div className={"plan-exercises-container"}>{exerciseDisplay}</div>
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

  if (true) {
    return (
      <ExerciseMobile
        name={name}
        length={length}
        setText={setText}
        displayReps={displayReps}
      />
    );
  } else {
    return (
      <ExerciseWeb
        name={name}
        length={length}
        setText={setText}
        displayReps={displayReps}
      />
    );
  }
};

const ExerciseMobile = ({ name, length, setText, displayReps }) => {
  return (
    <div className="plan-exercise-container plan-mobile-exercise-container color-gray flex-center font-fam-oswald">
      <div className="font-15 font-w-400 mr-1">
        {name}
        {" - "}
      </div>

      <span className="font-15 font-w-300">
        {length || 0} {setText} of {displayReps || 0} reps
      </span>
    </div>
  );
};

const ExerciseWeb = ({ name, length, setText, displayReps }) => {
  return (
    <div className="plan-exercise-container plan-web-exercise-container flex-center-space-bw color-gray">
      <div className="inline-block">
        <div className="font-15">
          <span className="font-w-500">{name} - </span>

          <span className="font-15">
            {length || 0} {setText} of {displayReps || 0} reps
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlanText;
