import React, { useState, useLayoutEffect, useContext } from "react";
import { NavContext } from "../../context/navContext";
import { IS_RED, SHOW_NONE, SHOW_DEHAZE } from "../../types/navTypes";

import DayView from "./DayView";
import ExerciseView from "./MobileViews/ExerciseView";
import Exercises from "../shared/Exercises/Exercises";
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
        dispatch({ type: SHOW_DEHAZE });
        dispatch({ type: IS_RED });
      } else {
        dispatch({ type: SHOW_NONE });
      }
    }

    setDouble();
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
          numberOfMonths={3}
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
    return (
      <Exercises
        handleAddExercise={handleAddExerciseski}
        closeExercises={() => setShowExercises(false)}
      />
    );
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

  let topNavContent = null;
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
  } else if (!showExercises && !showHistory) {
    topNavContent = (
      <div className="mobile-nav-icon-container flex-ai-center border-box">
        <button className="white-material-btn" onClick={onCalendarClick}>
          <i className="material-icons material-icons-22">calendar_today</i>
        </button>
        <button className="white-material-btn" onClick={onExerciseClick}>
          <i className="material-icons material-icons-30">add</i>
        </button>
      </div>
    );
  }

  let bottomNavContent = null;
  if (showHistory) {
    bottomNavContent = null;
  } else if (showExercises) {
    // bottomNavContent = (
    //   <button
    //     className="white-material-btn"
    //     onClick={}
    //   >
    //     <i className="material-icons reversed-icon font-16">
    //       arrow_forward_ios
    //     </i>
    //   </button>
    // );
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
      {topNavContent}
      <div>
        {/* <NavMid customNav={<MobileDouble topContent={topNavContent} />} /> */}
        <div className="bc-d9 width-100p flex-center-space-bw color-white padding-10 border-box">
          {bottomNavContent}
        </div>
        <div className="history-mobile-add-container">{view}</div>
      </div>
    </>
  );
};

export default MobileView;
