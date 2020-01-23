import React, { useState, useEffect } from "react";
import useSetLoading from "../../../hooks/useSetLoading";
import useNavBack from "../../../hooks/useNavBack";
import useSwipe from "../../../hooks/useSwipe";

import { Droppable, DragDropContext } from "react-beautiful-dnd";
import ExerciseCard from "./ExerciseCard";
import Exercises from "../../shared/Exercises/Exercises";
import LoadingSpinner from "../../shared/SVGs/LoadingSpinner";
import SubNav from "./MobileSubNav";
import Plus20 from "../../shared/SVGs/Plus20";

import "./mobileEditWeek.css";

const MobileEditWeek = ({
  weeks,
  planId,
  onDragEnd,
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
  handleEditSetRetry
}) => {
  const [showExercises, setShowExercises] = useState(false);
  const [activeExercise, setActiveExercise] = useState(null);

  useSetLoading(false);
  useNavBack(`/plans/${planId}`);

  const { days, _id: weekId } = currentWeek;
  const currentDay = days[currentDayIndex];
  const { _id: dayId } = currentDay;
  const { exercises } = currentDay;
  const {
    x,
    setX,
    transition,
    onTouchEnd,
    onTouchMove,
    onTouchStart
  } = useSwipe(
    () => onDecDate(() => setX(0)),
    () => onIncDate(() => setX(0))
  );

  useEffect(() => {
    setCurrentDayIndex(0);
  }, [weekIndex]);
  function onDecDate(or) {
    if (currentDayIndex > 0) setCurrentDayIndex(currentDayIndex - 1);
    else or();
  }

  function onIncDate(or) {
    if (currentDayIndex < 6) setCurrentDayIndex(currentDayIndex + 1);
    else or();
  }

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

  let touchActions = {};
  if (!activeExercise) {
    touchActions = {
      onTouchStart,
      onTouchMove,
      onTouchEnd
    };
  }

  return (
    <>
      <div onClick={() => setActiveExercise(null)}>
        <SubNav
          weeks={weeks}
          weekIndex={weekIndex}
          currentDayIndex={currentDayIndex}
          setCurrentDayIndex={setCurrentDayIndex}
        />
        {/* <div className="edit-week-mobile-head-container">
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
        </div> */}
        <div className="edit-week-mobile-add-btn-container">
          <button
            className="theme-btn-no-border"
            onClick={() => setShowExercises(true)}
          >
            <Plus20 fill={"#fff"} />
          </button>
        </div>
        <div className="pb-50 pt-50">
          <div className="history-mobile-days-container">
            <div className="history-mobile-days-wrapper">
              <div
                {...touchActions}
                className={
                  "history-mobile-days-box" +
                  (transition ? " history-mobile-days-box-transition" : "")
                }
                style={{
                  left: `${-x}px`
                }}
              >
                <div className="mobile-history-days-np-day">
                  <LoadingSpinner />
                </div>
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
                <div className="mobile-history-days-np-day">
                  <LoadingSpinner />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileEditWeek;
