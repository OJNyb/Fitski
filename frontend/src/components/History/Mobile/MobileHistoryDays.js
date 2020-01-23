import React, { useState } from "react";
import {
  displayDate,
  decrementDate,
  incrementDate
} from "../../../utils/formatHistoryDate";
import useSwipe from "../../../hooks/useSwipe";
import DeleteExerciseModal from "./DeleteExerciseModal";

import LoadingSpinner from "../../shared/SVGs/LoadingSpinner";

import Day from "./MobileHistoryDay";

import Plus20 from "../../shared/SVGs/Plus20";
import NavigateDays from "./NavigateDays";
import SelectedNavBar from "./SelectedNavBar";

function modifyDate(date, number) {
  let newDate = date;
  newDate.setDate(newDate.getDate() + number);

  return newDate;
}

const MobileDayView = ({
  date,
  handleDragEnd,
  currentDay,
  onDateChange,
  handleCopyDayClick,
  onCalendarClick,
  setShowExercise,
  onExercisesClick,
  handleDeleteExercises,
  handleAddExerciseRetry
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const {
    onTouchStart,
    onTouchMove,
    onTouchEnd,

    x,
    transition
  } = useSwipe(
    () => onDateChange(modifyDate(new Date(_d), -1)),

    () => onDateChange(modifyDate(new Date(_d), 1))
  );

  function handleDeleteSubmit() {
    handleDeleteExercises(selectedExercises);
    setShowDeleteModal(false);
    setSelectedExercises([]);
  }

  const { _d } = date;

  let bottomNavContent;

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
      <div className="bc-d9 width-100p flex-center-space-bw color-white padding-0 border-box height-50 fixed">
        <NavigateDays
          centerText={displayDate(_d)}
          leftArrowAction={() => onDateChange(decrementDate(_d))}
          rightArrowAction={() => onDateChange(incrementDate(_d))}
        />
      </div>
    );
  }

  let touchActions = {};
  if (!selectedExercises.length) {
    touchActions = {
      onTouchStart,
      onTouchMove,
      onTouchEnd
    };
  }

  let modal;
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
  return (
    <>
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
      <div className="pt-50 history-mobile-body-container margin-a">
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

              <Day
                // key={currentDay._id}
                currentDay={currentDay}
                onDragEnd={handleDragEnd}
                setShowExercise={setShowExercise}
                onCopyDayClick={handleCopyDayClick}
                onExercisesClick={onExercisesClick}
                handleDeleteExercises={handleDeleteExercises}
                handleAddExerciseRetry={handleAddExerciseRetry}
                selectedExercises={selectedExercises}
                setSelectedExercises={setSelectedExercises}
              />
              <div className="mobile-history-days-np-day">
                <LoadingSpinner />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileDayView;
