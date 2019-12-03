import React, { useState } from "react";
import {
  displayDate,
  incrementDate,
  decrementDate
} from "../../../utils/formatHistoryDate";

import MobileExerciseCard from "./MobileExerciseCard";
import Plus20 from "../../shared/SVGs/Plus20";
import NavigateDays from "./NavigateDays";
import DeleteExerciseModal from "./DeleteExerciseModal";

const MobileDayView = ({
  date,
  dayIndex,
  currentDay,
  onDateChange,
  onCalendarClick,
  onExercisesClick,
  onCopyDayClick,
  setShowExercise,
  handleDeleteExercises
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);

  const { _d } = date;

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

  function handleDeleteSubmit() {
    handleDeleteExercises(selectedExercises);
    setShowDeleteModal(false);
    setSelectedExercises([]);
  }

  let view;
  let modal;
  let bottomNavContent;
  if (showDeleteModal) {
    const { exercises } = currentDay;
    modal = (
      <DeleteExerciseModal
        exercises={exercises}
        selectedExercises={selectedExercises}
        onDeleteSubmit={handleDeleteSubmit}
      />
    );
  }

  if (selectedExercises.length) {
    bottomNavContent = (
      <SelectedNavBar
        selectedExercises={selectedExercises}
        setShowDeleteModal={setShowDeleteModal}
        setSelectedExercises={setSelectedExercises}
      />
    );
  } else {
    bottomNavContent = (
      <div className="bc-d9 width-100p flex-center-space-bw color-white padding-0 border-box height-6vh fixed">
        <NavigateDays
          centerText={displayDate(_d)}
          leftArrowAction={() => onDateChange(decrementDate(_d))}
          rightArrowAction={() => onDateChange(incrementDate(_d))}
        />
      </div>
    );
  }

  if (dayIndex !== -1) {
    const { exercises } = currentDay;
    view = exercises.map(exercise => {
      if (!exercise || !exercise.exercise) {
        return null;
      } else {
        return (
          <MobileExerciseCard
            key={exercise._id}
            exercise={exercise}
            onCardClick={handleCardClick}
            onCardHold={handleCardHold}
            setShowExercise={setShowExercise}
            selectedExercises={selectedExercises}
          />
        );
      }
    });
  } else {
    view = (
      <div className="history-mobile-empty-log-container flex-col-cen">
        <div />
        <p className="color-light-gray">Workout Log Empty</p>
        <div className="history-empty-log-btn-container history-mobile-empty-log-btn-container">
          <button onClick={onExercisesClick}>
            <Plus20 fill={"#a60000"} />
            <span className="color-light-gray">Start New Workout</span>
          </button>
          <button className="theme-btn-no-border" onClick={onCopyDayClick}>
            <i className="material-icons-outlined">file_copy</i>
            <span className="color-light-gray">Copy Previous Workout</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {modal}
      <div className="mobile-nav-icon-container flex-ai-center border-box fixed">
        <button
          className="white-material-btn padding-5"
          onClick={onCalendarClick}
        >
          <i className="material-icons material-icons-22">calendar_today</i>
        </button>

        <button
          className="white-material-btn padding-5"
          onClick={onExercisesClick}
        >
          <Plus20 fill={"#fff"} />
        </button>
      </div>
      {bottomNavContent}
      <div className="pt-6vh history-mobile-body-container margin-a">
        {view}
      </div>
    </>
  );
};

const SelectedNavBar = ({
  selectedExercises,
  setShowDeleteModal,
  setSelectedExercises
}) => {
  let text = selectedExercises.length > 1 ? "exercises" : "exercise";

  return (
    <div className="bc-d9 width-100p flex-center-space-bw padding-s-10 border-box height-6vh fixed">
      <div className="flex-ai-center history-mobile-selected-check-n-span-wrapper">
        <button
          className="padding-5 color-white"
          onClick={() => setSelectedExercises([])}
        >
          <i className="material-icons-outlined">check</i>
        </button>
        <span className="color-white font-w-500 font-14">
          {selectedExercises.length} {text}
        </span>
      </div>

      <div className="flex-ai-center">
        <button
          className="color-white padding-10"
          onClick={() => setShowDeleteModal(true)}
        >
          <i className="material-icons-outlined">delete</i>
        </button>
      </div>
    </div>
  );
};

export default MobileDayView;
