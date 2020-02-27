import React, { useState } from "react";
import {
  displayDate,
  decrementDate,
  incrementDate
} from "../../../utils/formatHistoryDate";
import useSwipe from "../../../hooks/useSwipe";
import DeleteExerciseModal from "./DeleteExerciseModal";
import NoteIcon from "./NoteIcon";
import CalendarIcon from "./CalendarIcon";
import NoteModal from "../NoteModal";
import useSetNav from "../../../hooks/useSetNav";

import LoadingSpinner from "../../shared/SVGs/LoadingSpinner";

import Day from "./MobileHistoryDay";

import Plus22 from "../../shared/SVGs/Plus22";
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
  handleEditDay,
  handleCopyDayClick,
  onCalendarClick,
  setShowExercise,
  onExercisesClick,
  handleDeleteExercises,
  handleAddExerciseRetry
}) => {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const { onTouchStart, onTouchMove, onTouchEnd, x, transition } = useSwipe(
    () => onDateChange(modifyDate(new Date(_d), -1)),

    () => onDateChange(modifyDate(new Date(_d), 1))
  );

  function handleDeleteSubmit() {
    handleDeleteExercises(selectedExercises);
    setShowDeleteModal(false);
    setSelectedExercises([]);
  }

  useSetNav({
    text: "Calendar",
    showDehaze: true,
    buttonId: "history1",
    buttons: (
      <>
        <button className="padding-5" onClick={() => setShowNoteModal(true)}>
          <NoteIcon />
        </button>
        <button
          className="white-material-btn padding-5"
          onClick={onCalendarClick}
        >
          <CalendarIcon />
        </button>

        <button
          className="white-material-btn padding-5"
          onClick={onExercisesClick}
        >
          <Plus22 fill={"#fff"} />
        </button>
      </>
    )
  });

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
      <div className="bc-theme-ligther width-100p flex-center-space-bw color-white padding-0 border-box height-50">
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
  if (showNoteModal) {
    let note;
    if (currentDay) {
      note = currentDay.note;
    }
    modal = (
      <NoteModal
        pNote={note}
        hideModal={() => setShowNoteModal(false)}
        onSubmit={handleEditDay}
      />
    );
  }
  return (
    <div className="pt-50">
      {modal}

      {bottomNavContent}
      <div className="history-mobile-body-container margin-a">
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
    </div>
  );
};

export default MobileDayView;
