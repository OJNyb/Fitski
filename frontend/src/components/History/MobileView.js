import React, { useState, useLayoutEffect, useContext } from "react";
import { NavContext } from "../../context/navContext";
import { SINGLE_NAV, DOUBLE_NAV } from "../../types/navTypes";

import DayView from "./DayView";
import ExerciseView from "./MobileViews/ExerciseView";
import NavMid from "../shared/NavMid/NavMid";
import Exercises from "../shared/Exercises/Exercises";
import MobileDouble from "../shared/NavMid/MobileDouble";
import { DayPicker } from "react-dates";
import { isSameDay } from "../../utils/formatHistoryDate";

import EditHistoryDownNav from "../shared/NavMid/EditHistoryDownNav";

import "./mobileView.css";

import {
  displayDate,
  incrementDate,
  decrementDate
} from "../../utils/formatHistoryDate";

const MobileView = ({
  date,
  dayIndex,
  currentDay,
  historyDays,
  onDateChange,
  handleAddSet,
  handleEditSet,
  handleDeleteSet,
  handleAddExercise,
  displayGroupCircle,
  handleDeleteExercise
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showExercise, setShowExercise] = useState(false);
  const [showExercises, setShowExercises] = useState(false);
  const [exerciseView, setExerciseView] = useState("track");
  const { dispatch } = useContext(NavContext);

  const { _d } = date;

  useLayoutEffect(() => {
    function setDouble() {
      if (!showHistory) {
        dispatch({ type: DOUBLE_NAV });
      } else {
        dispatch({ type: SINGLE_NAV });
      }
    }

    setDouble();
    return () => {
      dispatch(SINGLE_NAV);
    };
  }, [showHistory]);

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

  let currentExercise;
  let view;

  if (showHistory) {
    view = (
      <div className="history-mobile-calendar-container">
        <button
          className="history-mobile-cal-clear-btn"
          onClick={() => setShowHistory(false)}
        >
          <i className="material-icons">clear</i>
        </button>
        <DayPicker
          onDayClick={date => {
            onDateChange(date);
            setShowHistory(false);
          }}
          orientation={"vertical"}
          verticalHeight={Math.round(
            window.screen.height - (window.screen.height / 100) * 7
          )}
          transitionDuration={0}
          renderDayContents={({ _d: date }) => {
            let y = isSameDay(date, _d);
            return (
              <div
                className={
                  "history-mobile-calendar-day" +
                  (y ? " history-mobile-calendar-day-active" : "")
                }
              >
                {date.getDate()} {displayGroupCircle(date)}
              </div>
            );
          }}
        />
      </div>
    );
  } else if (showExercises) {
    view = <Exercises handleAddExercise={handleAddExerciseski} />;
  } else if (showExercise) {
    currentExercise = currentDay.exercises.filter(
      x => x._id === showExercise
    )[0];
    view = (
      <ExerciseView
        view={exerciseView}
        exer={currentExercise}
        historyDays={historyDays}
        handleAddSet={handleAddSet}
        handleEditSet={handleEditSet}
        handleDeleteSet={handleDeleteSet}
      />
    );
  } else {
    view = (
      <div className="margin-top-20">
        <DayView
          isMobile={true}
          dayIndex={dayIndex}
          currentDay={currentDay}
          handleAddSet={handleAddSet}
          handleEditSet={handleEditSet}
          handleDeleteSet={handleDeleteSet}
          setShowExercise={setShowExercise}
          setShowExercises={setShowExercises}
          handleDeleteExercise={handleDeleteExercise}
        />
      </div>
    );
  }

  let topNavContent;
  if (showExercise) {
    topNavContent = (
      <>
        <button
          className="white-btn nav-track-back-btn"
          onClick={() => setShowExercise(false)}
        >
          <i className="material-icons-round font-18 mr-5">arrow_back_ios</i>
          <span>{currentExercise.exercise.name}</span>
        </button>
      </>
    );
  } else if (showHistory) {
    topNavContent = <></>;
  } else {
    topNavContent = (
      <>
        <button className="white-material-btn" onClick={onCalendarClick}>
          <i className="material-icons material-icons-22">calendar_today</i>
        </button>
        <button className="white-material-btn" onClick={onExerciseClick}>
          <i className="material-icons material-icons-30">add</i>
        </button>
      </>
    );
  }

  let bottomNavContent;
  if (showHistory) {
    bottomNavContent = null;
  } else if (showExercises) {
    bottomNavContent = (
      <button
        className="white-material-btn"
        onClick={() => setShowExercises(false)}
      >
        <i className="material-icons reversed-icon font-16">
          arrow_forward_ios
        </i>
      </button>
    );
  } else if (showExercise) {
    bottomNavContent = (
      <>
        <div
          className={
            "history-mobile-exercise-header-item" +
            (exerciseView === "track"
              ? " history-mobile-exercise-header-active"
              : "")
          }
          onClick={() => setExerciseView("track")}
        >
          Track
        </div>
        <div
          className={
            "history-mobile-exercise-header-item" +
            (exerciseView === "history"
              ? " history-mobile-exercise-header-active"
              : "")
          }
          onClick={() => setExerciseView("history")}
        >
          History
        </div>
        <div
          className={
            "history-mobile-exercise-header-item" +
            (exerciseView === "graph"
              ? " history-mobile-exercise-header-active"
              : "")
          }
          onClick={() => setExerciseView("graph")}
        >
          Graph
        </div>
      </>
    );
  } else {
    bottomNavContent = (
      <EditHistoryDownNav
        centerText={displayDate(_d)}
        leftArrowAction={() => onDateChange(decrementDate(_d))}
        rightArrowAction={() => onDateChange(incrementDate(_d))}
      />
    );
  }

  return (
    <>
      <NavMid
        customNav={
          <MobileDouble
            topContent={topNavContent}
            bottomContent={bottomNavContent}
          />
        }
      />
      <div className="history-mobile-add-container">{view}</div>
    </>
  );
};

export default MobileView;
