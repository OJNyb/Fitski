import React, { useState } from "react";

import TrackNav from "./TrackNav";
import TrackView from "./TrackView";
import HistoryView from "./HistoryView";
import GraphView from "./GraphView";

import "./exerciseView.css";

const ExerciseView = ({
  exer,
  historyDays,
  handleAddSet,
  handleEditSet,
  handleDeleteSet,
  setShowExercise,
  handleAddSetRetry,
  handleEditSetRetry
}) => {
  const { _id: exerId, sets, exercise } = exer;
  const { _id: exerciseId } = exercise;
  const [exerciseView, setExerciseView] = useState("track");

  let viewDisplay;
  if (exerciseView === "track") {
    viewDisplay = (
      <TrackView
        sets={sets}
        exerId={exerId}
        exerciseId={exerciseId}
        onAddSet={handleAddSet}
        onEditSet={handleEditSet}
        onDeleteSet={handleDeleteSet}
        handleAddSetRetry={handleAddSetRetry}
        handleEditSetRetry={handleEditSetRetry}
      />
    );
  } else if (exerciseView === "history") {
    viewDisplay = <HistoryView exercise={exercise} historyDays={historyDays} />;
  } else {
    viewDisplay = <GraphView />;
  }
  return (
    <>
      <TrackNav
        exerciseName={exer.exercise.name}
        setShowExercise={setShowExercise}
      />
      <>
        <div className="width-100p flex-center-space-bw color-white border-box history-mobile-exercise-header">
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
      <div className="history-mobile-exercise-body flex-col">{viewDisplay}</div>
    </>
  );
};

export default ExerciseView;
