import React from "react";

import WebExerciseColumn from "./WebExerciseColumn";

import "../../History/editDay.css";
import "../../../styles/exerciseCard.css";

const WebExerciseCard = ({
  dayId,
  exercise,
  onAddSet,
  handleEditSet,
  handleDeleteSet,
  onDeleteExercise
}) => {
  const { exercise: nExercise, sets, _id: exerId } = exercise;

  if (!nExercise) {
    return null;
  }

  const { name, _id: exerciseId } = nExercise;

  let headDropdown = null;

  let setDisplay = sets.map((x, y) => (
    <WebExerciseColumn
      set={x}
      index={y}
      key={x._id}
      dayId={dayId}
      exerId={exerId}
      handleEditSet={handleEditSet}
      onDeleteSet={handleDeleteSet}
    />
  ));

  return (
    <div className="history-add-card margin-10-0">
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
      <div className="add-card-body">{setDisplay}</div>
    </div>
  );
};

export default WebExerciseCard;
