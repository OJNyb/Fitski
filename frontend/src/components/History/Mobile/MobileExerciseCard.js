import React from "react";
import { ensureDecimal } from "../../../utils/ensureDecimal";

import "../../../styles/exerciseCard.css";
import "../editDay.css";

const MobileExerciseCard = ({
  exercise,
  onAddSet,
  setShowExercise,
  onDeleteExercise
}) => {
  const {
    exercise: { name, _id: exerciseId },
    sets,
    _id: exerId
  } = exercise;

  let setDisplay = sets.map(set => <SetColumn set={set} key={set._id} />);

  return (
    <div
      className="history-add-card margin-10"
      onClick={() => setShowExercise(exerId)}
    >
      <div className="history-exercise-name">
        <span className="black">{name}</span>

        <div className="add-card-btn-container">
          <button
            className="theme-btn-no-border"
            onClick={e => {
              e.stopPropagation();
              onAddSet(exerId, exerciseId);
            }}
          >
            <i className="material-icons ">add</i>
          </button>
          <button
            className="add-card-remove-btn theme-btn-no-border"
            onClick={e => {
              e.stopPropagation();
              onDeleteExercise(exerId);
            }}
          >
            <i className="material-icons ">delete_outline</i>
          </button>
        </div>
      </div>

      <div className="add-card-body">{setDisplay}</div>
    </div>
  );
};

const SetColumn = ({ set }) => {
  const { reps, weight } = set;

  return (
    <div className="add-card-column flex-ai-center padding-4-20">
      <div className="history-row">
        <span>
          <span className="black mr-1">{ensureDecimal(weight) || 0.0}</span>
          <span className="color-gray font-12 font-w-300">kg</span>
        </span>
      </div>
      <div className="history-row">
        <span>
          <span className="black mr-1">{reps || 0}</span>
          <span className="color-gray font-12 font-w-300">reps</span>
        </span>
      </div>
    </div>
  );
};

export default MobileExerciseCard;
