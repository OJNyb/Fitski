import React, { useState } from "react";
// import NavMid from "../../shared/NavMid/NavMid";
// import MobileDouble from "../../shared/NavMid/MobileDouble";
// import EditHistoryDownNav from "../../shared/NavMid/EditHistoryDownNav";
// import useNavWhiteDoubleBack from "../../../hooks/useNavWhiteDoubleBack";

import ExerciseCard from "./ExerciseCard";
import Exercises from "../../shared/Exercises/Exercises";
import { Link } from "react-router-dom";

import "./EditWeekMobile.css";

const WeekView = ({
  weeks,
  planId,
  weekIndex,
  currentWeek,
  handleEditSet,
  handleAddSet,
  currentDayIndex,
  setCurrentDayIndex,
  handleDeleteSet,
  handleAddExercise,
  handleDeleteExercise
}) => {
  const [showExercises, setShowExercises] = useState(false);
  const [activeExercise, setActiveExercise] = useState(null);

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

  let mainView = exercises.map((x, y) => (
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
    />
  ));

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
        <div className="">{mainView}</div>
      </div>
    </>
  );
};

export default WeekView;
