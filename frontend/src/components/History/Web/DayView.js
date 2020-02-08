import React from "react";
import { useUser } from "../../../context/userContext";

import WebExerciseCard from "./WebExerciseCard";
import { Droppable, DragDropContext } from "react-beautiful-dnd";

const DayView = ({
  dayIndex,
  onDragEnd,
  currentDay,
  handleAddSet,
  onCopyClick,
  handleEditSet,
  handleDeleteSet,
  handleDeleteExercise,
  handleAddSetRetry,
  handleEditSetRetry,
  handleAddExerciseRetry
}) => {
  const user = useUser();
  const { defaultUnit } = user;
  if (currentDay && currentDay.exercises && currentDay.exercises.length) {
    const { exercises, request, isPending, isRejected } = currentDay;

    let exerciseDisplay = exercises.map((exercise, y) => {
      if (!exercise || !exercise.exercise) {
        return null;
      } else {
        return (
          <WebExerciseCard
            index={y}
            key={exercise._id}
            exercise={exercise}
            dayRequest={request}
            dayPending={isPending}
            dayRejected={isRejected}
            onAddSet={handleAddSet}
            defaultUnit={defaultUnit}
            handleEditSet={handleEditSet}
            handleDeleteSet={handleDeleteSet}
            onDeleteExercise={handleDeleteExercise}
            handleAddSetRetry={handleAddSetRetry}
            handleEditSetRetry={handleEditSetRetry}
            onAddExerciseRetry={handleAddExerciseRetry}
          />
        );
      }
    });

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"1"} isDropDisabled={!exercises.length}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={
                "web-exercise-droppable-container" +
                (snapshot.isDraggingOver
                  ? " web-exercise-container-dragging-over"
                  : "")
              }
            >
              {exerciseDisplay}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  } else {
    return (
      <div className="history-empty-log-container">
        <p>Workout Log Empty</p>
        <button
          onClick={onCopyClick}
          className="theme-btn-filled history-big-screen-copy-btn"
        >
          Copy Previous Workout
        </button>
        <p className="theme-faded history-big-screen-add-p margin-top-10">
          Start adding exercises
        </p>
      </div>
    );
  }
};

export default DayView;
