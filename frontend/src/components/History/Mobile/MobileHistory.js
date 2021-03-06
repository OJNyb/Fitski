import React, {
  lazy,
  Suspense,
  useState,
  useEffect,
  useContext,
  useLayoutEffect
} from "react";
import { NavContext } from "../../../context/navContext";
import useSetLoading from "../../../hooks/useSetLoading";
import { SHOW_NONE, SHOW_DEHAZE } from "../../../types/navTypes";

import HistoryDays from "./MobileHistoryDays";
import SetLoading from "../../SetLoading";

import "./mobileView.css";
const loadExerciseView = () => import("./ExerciseView");
const ExerciseView = lazy(loadExerciseView);
const loadExercises = () => import("../../shared/Exercises/Exercises");
const Exercises = lazy(loadExercises);
const loadCalendar = () => import("../../shared/Calendar/MobileCalendar");
const CalendarView = lazy(loadCalendar);
const loadCopyDayView = () => import("./CopyDayView");
const CopyDayView = lazy(loadCopyDayView);

const MobileView = ({
  date,
  prevDay,
  nextDay,
  currentDay,
  historyDays,
  handleDateChange,
  handleAddSet,
  handleEditSet,
  handleEditDay,
  handleCopyDay,
  handleDeleteSet,
  handleAddSetRetry,
  handleAddExercise,
  displayGroupCircle,
  handleEditSetRetry,
  handleDeleteExercises,
  handleReorderExercise,
  handleAddExerciseRetry,
  refreshHistory
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showExercise, setShowExercise] = useState(false);
  const [showExercises, setShowExercises] = useState(false);
  const [showCopyView, setShowCopyView] = useState(false);
  const { dispatch } = useContext(NavContext);

  useSetLoading(false);

  useLayoutEffect(() => {
    function setDouble() {
      if (!showHistory && !showExercise) {
        dispatch({ type: SHOW_DEHAZE });
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

  function handleExercisesClick() {
    setShowHistory(false);
    setShowExercises(true);
  }

  function handleCalendarClick() {
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
        setShowCalendar={setShowHistory}
        displayGroupCircle={displayGroupCircle}
        onDayClick={date => {
          handleDateChange(date);
          setShowHistory(false);
        }}
      />
    );
  } else if (showExercises) {
    return (
      <Suspense fallback={<SetLoading />}>
        <Exercises
          refreshExercises={refreshHistory}
          handleAddExercise={handleAddExerciseski}
          closeExercises={() => setShowExercises(false)}
        />
      </Suspense>
    );
  } else if (showExercise) {
    const { exercises } = currentDay;
    currentExercise = exercises.filter(x => x._id === showExercise)[0];
    view = (
      <Suspense fallback={<SetLoading />}>
        <ExerciseView
          exer={currentExercise}
          setShowExercise={setShowExercise}
          historyDays={historyDays}
          handleAddSet={handleAddSet}
          handleEditSet={handleEditSet}
          handleDeleteSet={handleDeleteSet}
          handleAddSetRetry={handleAddSetRetry}
          handleEditSetRetry={handleEditSetRetry}
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
      <HistoryDays
        date={date}
        prevDay={prevDay}
        nextDay={nextDay}
        currentDay={currentDay}
        handleEditDay={handleEditDay}
        onDateChange={handleDateChange}
        setShowExercise={setShowExercise}
        handleDragEnd={handleReorderExercise}
        onCalendarClick={handleCalendarClick}
        handleCopyDayClick={handleCopyDayClick}
        onExercisesClick={handleExercisesClick}
        handleDeleteExercises={handleDeleteExercises}
        handleAddExerciseRetry={handleAddExerciseRetry}
      />
    );
  }

  return (
    <>
      <div className="width-100p">
        <div className="history-mobile-container pb-50">{view}</div>
      </div>
    </>
  );
};

export default MobileView;
