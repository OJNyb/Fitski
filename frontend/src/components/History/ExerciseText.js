import React from "react";

import { ensureDecimal } from "../../utils/ensureDecimal";

const ExerciseText = ({ exercise }) => {
  const {
    exercise: { name },
    sets
  } = exercise;
  let setsView = sets.map(x => {
    return <Row key={x._id} set={x} />;
  });
  return (
    <div>
      <div className="history-exercise-input-header color-gray font-w-500 font-14">
        {name}
      </div>
      {setsView}
    </div>
  );
};

const Row = ({ set }) => {
  const { reps, weight } = set;
  return (
    <div className="history-exercise-text-row">
      <div className="history-mobile-exercise-list-label-wrapper">
        <b className="color-gray mr-1 font-14">{ensureDecimal(weight)}</b>
        <span className="black font-12 font-w-300">kgs</span>
      </div>
      <div className="history-mobile-exercise-list-label-wrapper">
        <b className="color-gray mr-1 font-14">{reps}</b>
        <span className="black font-12 font-w-300">reps</span>
      </div>
    </div>
  );
};

export { ExerciseText, Row };
