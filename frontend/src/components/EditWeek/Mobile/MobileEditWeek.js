import React, { useState, useEffect } from "react";
import useSetLoading from "../../../hooks/useSetLoading";
import useNavBack from "../../../hooks/useNavBack";
import useSwipe from "../../../hooks/useSwipe";

import { Droppable, DragDropContext } from "react-beautiful-dnd";
import ExerciseCard from "./ExerciseCard";
import Exercises from "../../shared/Exercises/Exercises";
import LoadingSpinner from "../../shared/SVGs/LoadingSpinner";
import EditWeekNav from "./MobileEditWeekNav";
import SubNav from "./MobileSubNav";

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
  handleEditSetRetry,
  handleDeleteWeekSubmit,
  refreshPlan
}) => {
  const [showExercises, setShowExercises] = useState(false);
  const [activeExercise, setActiveExercise] = useState(null);

  useSetLoading(false);
  useNavBack(`/plans/${planId}`);

  const { days } = currentWeek;
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
  }, [weekIndex, setCurrentDayIndex]);
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
          refreshExercises={refreshPlan}
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
        <EditWeekNav
          weeks={weeks}
          weekIndex={weekIndex}
          isMobile={true}
          handleDeleteWeekSubmit={handleDeleteWeekSubmit}
          setShowExercises={setShowExercises}
        />
        <SubNav
          weeks={weeks}
          weekIndex={weekIndex}
          currentDayIndex={currentDayIndex}
          setCurrentDayIndex={setCurrentDayIndex}
        />

        <div className="pb-50 pt-50">
          <div className="history-mobile-days-container">
            <div className="history-mobile-days-wrapper pt-50">
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
