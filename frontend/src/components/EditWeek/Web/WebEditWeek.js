import React from "react";

import WebExerciseCard from "./WebExerciseCard";
import Exercises from "../../shared/Exercises/Exercises";
import useSetLoading from "../../../hooks/useSetLoading";
import { Droppable, DragDropContext } from "react-beautiful-dnd";

import "./webEditWeek.css";

const WebEditWeek = ({
  onDragEnd,
  currentWeek,
  handleEditSet,
  handleAddSet,
  currentDayIndex,
  handleDeleteSet,
  handleAddExercise,
  setCurrentDayIndex,
  handleDeleteExercise,
  handleAddExerciseRetry,
  handleAddSetRetry,
  handleEditSetRetry
}) => {
  const { days } = currentWeek;
  const currentDay = days[currentDayIndex];
  const { _id: dayId } = currentDay;
  const { exercises } = currentDay;
  useSetLoading(false);

  let dayBtns = days.map((day, index) => (
    <button
      key={day._id}
      onClick={() => setCurrentDayIndex(index)}
      className={currentDayIndex === index ? "edit-week-day-active" : ""}
    >
      {index + 1}
    </button>
  ));

  let exerciseCards = exercises.map((x, y) => (
    <WebExerciseCard
      index={y}
      key={x._id}
      dayId={dayId}
      exercise={x}
      onAddSet={handleAddSet}
      handleEditSet={handleEditSet}
      handleDeleteSet={handleDeleteSet}
      onDeleteExercise={handleDeleteExercise}
      handleAddSetRetry={handleAddSetRetry}
      handleEditSetRetry={handleEditSetRetry}
      onAddExerciseRetry={handleAddExerciseRetry}
    />
  ));

  return (
    <div className="edit-week-container">
      <div className="edit-week-add-container">
        <h2 className="edit-week-header color-gray">Days</h2>

        <div className="edit-week-add-days-container">{dayBtns}</div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={"1"} isDropDisabled={!exercises.length}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                // TODO
                className={
                  "web-exercise-droppable-container" +
                  (snapshot.isDraggingOver
                    ? " web-exercise-container-dragging-over"
                    : "")
                }
              >
                {exerciseCards}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="edit-week-exercise-container">
        <h2 className="edit-week-header color-gray">Exercises</h2>
        <Exercises handleAddExercise={handleAddExercise} />;
      </div>
    </div>
  );
};

export default WebEditWeek;
