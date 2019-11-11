import React, {
  lazy,
  Suspense,
  useState,
  useEffect,
  useContext,
  useLayoutEffect
} from "react";
import { NavContext } from "../../../context/navContext";
import { IS_RED, SHOW_NONE, SHOW_DEHAZE } from "../../../types/navTypes";
import useSetLoading from "../../../hooks/useSetLoading";

import {
  displayDate,
  incrementDate,
  decrementDate
} from "../../../utils/formatHistoryDate";

import TrackNav from "./TrackNav";
import MobileDayView from "./MobileDayView";
import NavigateDays from "./NavigateDays";

import "./mobileView.css";

import SetLoading from "../../SetLoading";
import Plus20 from "../../shared/SVGs/Plus20";

const loadExerciseView = () => import("./ExerciseView");
const ExerciseView = lazy(loadExerciseView);
const loadExercises = () => import("../../shared/Exercises/Exercises");
const Exercises = lazy(loadExercises);
const loadCalendar = () => import("./CalendarView");
const CalendarView = lazy(loadCalendar);
const loadCopyDayView = () => import("./CopyDayView");
const CopyDayView = lazy(loadCopyDayView);

const MobileView = ({
  date,
  dayIndex,
  currentDay,
  historyDays,
  onDateChange,
  handleAddSet,
  handleEditSet,
  handleCopyDay,
  handleDeleteSet,
  handleAddExercise,
  displayGroupCircle,
  handleDeleteExercise
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showExercise, setShowExercise] = useState(false);
  const [showExercises, setShowExercises] = useState(false);
  const [showCopyView, setShowCopyView] = useState(false);

  const [exerciseView, setExerciseView] = useState("track");
  const { dispatch } = useContext(NavContext);
  useSetLoading(false);

  const { _d } = date;

  useLayoutEffect(() => {
    function setDouble() {
      if (!showHistory && !showExercise) {
        dispatch({ type: SHOW_DEHAZE });
        dispatch({ type: IS_RED });
      } else {
        dispatch({ type: SHOW_NONE });
      }
    }

    setDouble();
  }, [dispatch, showHistory, showExercise]);

  useEffect(() => {
    loadExerciseView();
    loadExercises();
    loadCalendar();
    loadCopyDayView();
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

  function handleCopyDayClick() {
    setShowCopyView(true);
  }

  let currentExercise;
  let view;

  if (showHistory) {
    view = (
      <CalendarView
        date={date}
        onDateChange={onDateChange}
        setShowHistory={setShowHistory}
        displayGroupCircle={displayGroupCircle}
        onDayClick={date => {
          onDateChange(date);
          setShowHistory(false);
        }}
      />
    );
  } else if (showExercises) {
    return (
      <Suspense fallback={<SetLoading />}>
        <Exercises
          handleAddExercise={handleAddExerciseski}
          closeExercises={() => setShowExercises(false)}
        />
      </Suspense>
    );
  } else if (showExercise) {
    currentExercise = currentDay.exercises.filter(
      x => x._id === showExercise
    )[0];
    view = (
      <Suspense fallback={SetLoading}>
        <ExerciseView
          view={exerciseView}
          exer={currentExercise}
          historyDays={historyDays}
          handleAddSet={handleAddSet}
          handleEditSet={handleEditSet}
          handleDeleteSet={handleDeleteSet}
        />
      </Suspense>
    );
  } else if (showCopyView) {
    view = (
      <CopyDayView
        date={date}
        historyDays={historyDays}
        handleCopyDay={handleCopyDay}
        setShowCopyView={setShowCopyView}
        displayGroupCircle={displayGroupCircle}
      />
    );
  } else {
    view = (
      <MobileDayView
        onCopyDayClick={handleCopyDayClick}
        dayIndex={dayIndex}
        currentDay={currentDay}
        handleAddSet={handleAddSet}
        handleEditSet={handleEditSet}
        handleDeleteSet={handleDeleteSet}
        setShowExercise={setShowExercise}
        setShowExercises={setShowExercises}
        setShowCopyView={setShowCopyView}
        handleDeleteExercise={handleDeleteExercise}
      />
    );
  }

  let topNavContent = null;
  if (showExercise) {
    topNavContent = (
      <TrackNav
        exerciseName={currentExercise.exercise.name}
        setShowExercise={setShowExercise}
      />
    );
  } else if (!showExercises && !showHistory) {
    topNavContent = (
      <div className="mobile-nav-icon-container flex-ai-center border-box">
        <button className="white-material-btn" onClick={onCalendarClick}>
          <i className="material-icons material-icons-22">calendar_today</i>
        </button>
        <button className="white-material-btn" onClick={onExerciseClick}>
          {/* <i className="material-icons material-icons-30">add</i> */}
          <Plus20 fill={"#fff"} />
        </button>
      </div>
    );
  }

  let bottomNavContent = null;
  if (showExercise) {
    bottomNavContent = (
      <>
        <div className="width-100p flex-center-space-bw color-white border-box">
          <div
            className={
              "history-mobile-exercise-header-item flex-center" +
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
              "history-mobile-exercise-header-item flex-center" +
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
              "history-mobile-exercise-header-item flex-center" +
              (exerciseView === "graph"
                ? " history-mobile-exercise-header-active"
                : "")
            }
            onClick={() => setExerciseView("graph")}
          >
            Graph
          </div>
        </div>
      </>
    );
  } else if (!showHistory && !showExercises && !showCopyView) {
    bottomNavContent = (
      <div className="bc-d9 width-100p flex-center-space-bw color-white padding-0 border-box height-6vh">
        <NavigateDays
          centerText={displayDate(_d)}
          leftArrowAction={() => onDateChange(decrementDate(_d))}
          rightArrowAction={() => onDateChange(incrementDate(_d))}
        />
      </div>
    );
  }

  return (
    <>
      {topNavContent}
      <div>
        {bottomNavContent}

        <div className="history-mobile-add-container">{view}</div>
      </div>
    </>
  );
};

export default MobileView;
