import React from "react";

import WebExerciseColumn from "./WebExerciseColumn";

import "../editDay.css";
import "../../../styles/exerciseCard.css";

const ExerciseCard = ({
  dayId,
  exercise,
  onAddSet,
  handleEditSet,
  handleDeleteSet,
  setShowExercise,
  onDeleteExercise
}) => {
  const {
    exercise: { name, _id: exerciseId },
    sets,
    _id: exerId
  } = exercise;

  let headDropdown = null;

  let setDisplay = sets.map(set => (
    <SetColumn
      set={set}
      key={set._id}
      dayId={dayId}
      exerId={exerId}
      handleEditSet={handleEditSet}
      onDeleteSet={handleDeleteSet}
    />
  ));

  return (
    <div className="history-add-card margin-10">
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

      {headDropdown}
      <div className="add-card-body ">{setDisplay}</div>
    </div>
  );
};

const SetColumn = ({ set, exerId, onDeleteSet, handleEditSet }) => {
  const { reps, weight, _id: setId } = set;

  return (
    <div className="add-card-column flex-ai-center padding-0-20">
      <WebExerciseColumn
        reps={reps}
        setId={setId}
        exerId={exerId}
        weight={weight}
        onDeleteSet={onDeleteSet}
        handleEditSet={handleEditSet}
      />
    </div>
  );
};

export default ExerciseCard;
