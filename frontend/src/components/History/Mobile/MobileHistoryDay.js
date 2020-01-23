import React from "react";
import { useUser } from "../../../context/userContext";
import { Link } from "react-router-dom";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import MobileExerciseCard from "./MobileExerciseCard";
import Plus20 from "../../shared/SVGs/Plus20";

const MobileDayView = ({
  onDragEnd,
  currentDay,
  onCopyDayClick,
  setShowExercise,
  onExercisesClick,
  selectedExercises,
  setSelectedExercises,
  handleDeleteExercises,
  handleAddExerciseRetry
}) => {
  const user = useUser();
  const { defaultUnit } = user;

  function handleCardClick(exerId) {
    if (selectedExercises.length) {
      handleCardHold(exerId);
    } else {
      setShowExercise(exerId);
    }
  }

  function handleCardHold(exerId) {
    const index = selectedExercises.indexOf(exerId);
    const newSelected = selectedExercises.concat();
    if (index > -1) {
      newSelected.splice(index, 1);
    } else {
      newSelected.push(exerId);
    }
    setSelectedExercises(newSelected);
  }

  if (currentDay) {
    const { exercises, request, isPending, isRejected } = currentDay;

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"1"} isDropDisabled={!selectedExercises.length}>
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
              {exercises.map((exercise, index) => {
                if (!exercise || !exercise.exercise) {
                  return null;
                } else {
                  return (
                    <MobileExerciseCard
                      index={index}
                      key={exercise._id}
                      exercise={exercise}
                      dayRequest={request}
                      dayPending={isPending}
                      dayRejected={isRejected}
                      defaultUnit={defaultUnit}
                      onCardClick={handleCardClick}
                      onCardHold={handleCardHold}
                      setShowExercise={setShowExercise}
                      selectedExercises={selectedExercises}
                      onDeleteExercises={handleDeleteExercises}
                      onAddExerciseRetry={handleAddExerciseRetry}
                    />
                  );
                }
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  } else {
    return (
      <MobileEmpty
        text={"Workout Log Empty"}
        children={[
          {
            text: "Start New Workout",
            icon: <Plus20 fill={"#a60000"} />,
            onClick: onExercisesClick
          },
          {
            text: "Copy Previous Workout",
            icon: <i className="material-icons-outlined">file_copy</i>,
            onClick: onCopyDayClick
          }
        ]}
      />
    );
  }
};

const MobileEmpty = ({ text, children }) => {
  const buttons = children.map(x => <MobileBtn el={x} key={x.text} />);
  return (
    <div className="mobile-history-empty-container flex-col-cen">
      <div />
      <p className="color-light-gray">{text}</p>
      <div className="flex-col mobile-empty-log-btn-container">{buttons}</div>
    </div>
  );
};

const MobileBtn = ({ el }) => {
  const { to, icon, text, onClick } = el;
  const children = (
    <>
      {icon}
      <span className="color-light-gray">{text}</span>
    </>
  );
  if (to) {
    return (
      <Link to={to} className="flex-col-cen">
        {children}
      </Link>
    );
  } else {
    return (
      <button className="flex-col-cen" onClick={onClick}>
        {children}
      </button>
    );
  }
};

export default MobileDayView;
