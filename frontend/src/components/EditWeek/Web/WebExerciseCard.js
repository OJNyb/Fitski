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
  onDeleteExercise,
  onAddExerciseRetry,
  handleAddSetRetry,
  handleEditSetRetry
}) => {
  const {
    exercise: nExercise,
    sets,
    _id: exerId,
    request,
    isPending,
    isRejected
  } = exercise;

  if (!nExercise) {
    return null;
  }

  function onRetryClick(e) {
    e.stopPropagation();

    if (request === "add") {
      onAddExerciseRetry(exercise);
    } else if (request === "delete") {
      onDeleteExercise(exerId);
    }
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
      onAddSetRetry={handleAddSetRetry}
      onEditSetRetry={handleEditSetRetry}
    />
  ));

  return (
    <div
      className={
        "history-add-card margin-10-0" +
        (isPending ? " exercise-card-pending" : "") +
        (isRejected ? " exercise-card-rejected" : "")
      }
    >
      <div className="history-exercise-name">
        <span className="black font-14">{name}</span>

        <div className="add-card-btn-container">
          {isRejected ? (
            <div className="exercise-card-rejected-container flex-ai-center">
              <span className="color-gray text-center">Request failed</span>
              <button
                className="padding-5 theme-btn-no-border"
                onClick={onRetryClick}
              >
                <i className="material-icons">refresh</i>
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {headDropdown}
      <div className="add-card-body">{setDisplay}</div>
    </div>
  );
};

export default WebExerciseCard;
