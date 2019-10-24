import React, { useState, useLayoutEffect, useContext } from "react";
import { NavContext } from "../../context/navContext";
import { SINGLE_NAV, DOUBLE_NAV } from "../../types/navTypes";

import DayView from "./DayView";
import Calendar from "react-calendar/dist/entry.nostyle";
import NavMid from "../shared/NavMid/NavMid";
import Exercises from "../shared/Exercises/Exercises";
import MobileDouble from "../shared/NavMid/MobileDouble";
import EditHistoryDownNav from "../shared/NavMid/EditHistoryDownNav";

import {
  displayDate,
  incrementDate,
  decrementDate
} from "../../utils/formatHistoryDate";

const MobileView = ({
  date,
  dayIndex,
  currentDay,
  onDateChange,
  handleAddSet,
  handleEditSet,
  handleDeleteSet,
  handleAddExercise,
  displayGroupCircle,
  handleDeleteExercise
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showExercises, setShowExercises] = useState(false);
  const { dispatch } = useContext(NavContext);

  useLayoutEffect(() => {
    function setDouble() {
      dispatch({ type: DOUBLE_NAV });
    }

    setDouble();
    return () => {
      dispatch(SINGLE_NAV);
    };
  }, []);

  function handleAddExerciseski(exercise) {
    handleAddExercise(exercise);
    setShowExercises(false);
  }

  function onExerciseClick() {
    setShowHistory(false);
    setShowExercises(true);
  }

  function onCalendarClick() {
    setShowExercises(false);
    setShowHistory(true);
  }

  let view;
  if (showHistory) {
    view = (
      <Calendar
        value={date}
        onChange={onDateChange}
        tileContent={({ date, view }) => displayGroupCircle(date, view)}
      />
    );
  } else if (showExercises) {
    view = <Exercises handleAddExercise={handleAddExerciseski} />;
  } else {
    view = (
      <DayView
        dayIndex={dayIndex}
        currentDay={currentDay}
        handleAddSet={handleAddSet}
        handleEditSet={handleEditSet}
        handleDeleteSet={handleDeleteSet}
        setShowExercises={setShowExercises}
        handleDeleteExercise={handleDeleteExercise}
      />
    );
  }

  let bottomNavContent;
  if (showHistory) {
    bottomNavContent = (
      <button
        className="theme-btn-no-border"
        onClick={() => setShowHistory(false)}
      >
        <i className="material-icons reversed-icon font-16">
          arrow_forward_ios
        </i>
      </button>
    );
  } else if (showExercises) {
    bottomNavContent = (
      <button
        className="theme-btn-no-border"
        onClick={() => setShowExercises(false)}
      >
        <i className="material-icons reversed-icon font-16">
          arrow_forward_ios
        </i>
      </button>
    );
  } else {
    bottomNavContent = (
      <EditHistoryDownNav
        centerText={displayDate(date)}
        leftArrowAction={() => onDateChange(decrementDate(date))}
        rightArrowAction={() => onDateChange(incrementDate(date))}
      />
    );
  }

  return (
    <>
      <NavMid
        customNav={
          <MobileDouble
            topContent={
              <>
                <button
                  className="theme-btn-no-border"
                  onClick={onCalendarClick}
                >
                  <i className="material-icons material-icons-22">
                    calendar_today
                  </i>
                </button>
                <button
                  className="theme-btn-no-border"
                  onClick={onExerciseClick}
                >
                  <i className="material-icons material-icons-30">add</i>
                </button>
              </>
            }
            bottomContent={bottomNavContent}
          />
        }
      />
      <div className="history-mobile-add-container">{view}</div>
    </>
  );
};

export default MobileView;
