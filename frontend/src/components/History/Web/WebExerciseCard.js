import React from "react";

import WebExerciseColumn from "./WebExerciseColumn";
import { Draggable } from "react-beautiful-dnd";
import DragIcon from "../../shared/SVGs/DragIcon";

import "../../../styles/exerciseCard.css";

const ExerciseCard = ({
  index,
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
    exercise: { name, unit, _id: exerciseId }
  } = exercise;

  let headDropdown = null;

  let setDisplay = sets.map(set => (
    <WebExerciseColumn
      set={set}
      key={set._id}
      exerId={exerId}
      unit={unit}
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
    <Draggable draggableId={exerId} index={index} isDragDisabled={isRejected}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="pt-10 exercise-card-container"
        >
          <div
            className={
              "exercise-card" +
              (isPending || dayPending ? " exercise-card-pending" : "") +
              (isRejected || dayRejected ? " exercise-card-rejected" : "") +
              (snapshot.isDragging ? " exercise-card-dragging" : "")
            }
          >
            <div className="history-exercise-name">
              <span className="black font-14">{name}</span>

              <div className="add-card-btn-container">
                {isRejected || dayRejected ? (
                  <div className="exercise-card-rejected-container flex-ai-center">
                    <span className="color-gray text-center">
                      Request failed
                    </span>
                    <button className="padding-5 tc" onClick={onRetryClick}>
                      <i className="material-icons">refresh</i>
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      className="exercise-drag-handle padding-5"
                      onTouchStart={e => e.stopPropagation()}
                      {...provided.dragHandleProps}
                    >
                      <DragIcon fill={"#a60000"} />
                    </button>
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
        </div>
      )}
    </Draggable>
  );
};

export default ExerciseCard;
