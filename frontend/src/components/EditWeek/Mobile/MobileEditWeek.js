import React, { useState } from "react";
import useSetLoading from "../../../hooks/useSetLoading";
import useNavBack from "../../../hooks/useNavBack";

import { Droppable, DragDropContext } from "react-beautiful-dnd";
import ExerciseCard from "./ExerciseCard";
import Exercises from "../../shared/Exercises/Exercises";
import { Link } from "react-router-dom";

import "./mobileEditWeek.css";

const MobileEditWeek = ({
  weeks,
  planId,
  weekIndex,
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
  handleEditSetRetry,
  onDragEnd
}) => {
  const [showExercises, setShowExercises] = useState(false);
  const [activeExercise, setActiveExercise] = useState(null);
  useSetLoading(false);
  useNavBack(`/plans/${planId}`);

  const { days, _id: weekId } = currentWeek;
  const currentDay = days[currentDayIndex];
  const { _id: dayId } = currentDay;
  const { exercises } = currentDay;

  function handleCardClick(exerId) {
    if (exerId === activeExercise) {
      setActiveExercise(null);
    } else {
      setActiveExercise(exerId);
    }
  }

  if (showExercises) {
    return (
      <>
        <Exercises
          handleAddExercise={handleAddExercise}
          closeExercises={() => setShowExercises(false)}
        />
      </>
    );
  }

  let prevWeekLink;
  let nextWeekLink;

  if (weeks[weekIndex - 1]) {
    prevWeekLink = `${weeks[weekIndex - 1]._id}`;
  }

  if (weeks[weekIndex + 1]) {
    nextWeekLink = `${weeks[weekIndex + 1]._id}`;
  }

  return (
    <>
      <div
        onClick={() => setActiveExercise(null)}
        className="min-h-93vh-10 pt-10"
      >
        <div className="edit-week-mobile-head-container">
          <div className="edit-week-mobile-date-container">
            <div className="edit-week-mobile-date-btn">
              <span>Week</span>
              <div className="flex-center">
                <Link
                  to={prevWeekLink || weekId}
                  className="theme-btn-no-border"
                  aria-disabled={!prevWeekLink}
                >
                  <i className="material-icons">keyboard_arrow_left</i>
                </Link>
                <span className="black">{weekIndex + 1}</span>
                <Link
                  className="theme-btn-no-border"
                  to={nextWeekLink || weekId}
                  aria-disabled={!nextWeekLink}
                >
                  <i className="material-icons">keyboard_arrow_right</i>
                </Link>
              </div>
            </div>
          </div>

          <button
            className="theme-btn-no-border"
            onClick={() => setShowExercises(true)}
          >
            <i className="material-icons" style={{ fontSize: "32px" }}>
              add
            </i>
          </button>

          <div className="edit-week-mobile-date-container">
            <div className="edit-week-mobile-date-btn">
              <span>Day</span>
              <div className="flex-center">
                <button
                  className="theme-btn-no-border"
                  disabled={!currentDayIndex}
                  onClick={() => setCurrentDayIndex(currentDayIndex - 1)}
                >
                  <i className="material-icons">keyboard_arrow_left</i>
                </button>
                <span className="black">{currentDayIndex + 1}</span>
                <button
                  className="theme-btn-no-border"
                  disabled={currentDayIndex === 6}
                  onClick={() => setCurrentDayIndex(currentDayIndex + 1)}
                >
                  <i className="material-icons">keyboard_arrow_right</i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-50">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={"1"} isDropDisabled={!activeExercise}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={
                    "mobile-droppable-container" +
                    (snapshot.isDraggingOver
                      ? "exercise-container-dragging-over"
                      : "")
                  }
                >
                  {exercises.map((x, y) => (
                    <ExerciseCard
                      key={x._id}
                      index={y}
                      exercise={x}
                      dayId={dayId}
                      onAddSet={handleAddSet}
                      handleEditSet={handleEditSet}
                      handleDeleteSet={handleDeleteSet}
                      activeExercise={activeExercise}
                      onCardClick={handleCardClick}
                      onDeleteExercise={() => handleDeleteExercise(x._id)}
                      handleAddSetRetry={handleAddSetRetry}
                      handleEditSetRetry={handleEditSetRetry}
                      onAddExerciseRetry={handleAddExerciseRetry}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default MobileEditWeek;
