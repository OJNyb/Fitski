import React from "react";

import WebExerciseColumn from "./WebExerciseColumn";

import "../editDay.css";
import "../../../styles/exerciseCard.css";

const ExerciseCard = ({
  dayId,
  exercise,
  onAddSet,
  dayPending,
  dayRequest,
  dayRejected,
  defaultUnit,
  handleEditSet,
  handleDeleteSet,
  onDeleteExercise,
  handleAddSetRetry,
  handleEditSetRetry,
  onAddExerciseRetry
}) => {
  const {
    sets,
    request,
    isPending,
    isRejected,
    _id: exerId,
    exercise: { name, _id: exerciseId }
  } = exercise;

  let headDropdown = null;

  let setDisplay = sets.map(set => (
    <WebExerciseColumn
      set={set}
      key={set._id}
      exerId={exerId}
      defaultUnit={defaultUnit}
      handleEditSet={handleEditSet}
      onDeleteSet={handleDeleteSet}
      onAddSetRetry={handleAddSetRetry}
      onEditSetRetry={handleEditSetRetry}
    />
  ));

  function onRetryClick() {
    if (request === "add" || dayRequest === "add") {
      onAddExerciseRetry(exercise);
    } else if (request === "delete" || dayRequest === "delete") {
      onDeleteExercise(exerId);
    }
  }

  return (
    <div
      className={
        "history-add-card margin-10" +
        (isPending || dayPending ? " exercise-card-pending" : "") +
        (isRejected || dayRejected ? " exercise-card-rejected" : "")
      }
    >
      <div className="history-exercise-name">
        <span className="black">{name}</span>

        <div className="add-card-btn-container">
          {isRejected || dayRejected ? (
            <div className="exercise-card-rejected-container flex-ai-center">
              <span className="color-gray text-center">Request failed</span>
              <button className="padding-5 tc" onClick={onRetryClick}>
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
      <div className="add-card-body ">{setDisplay}</div>
    </div>
  );
};

export default ExerciseCard;
