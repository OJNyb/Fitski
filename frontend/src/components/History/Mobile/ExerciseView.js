import React, { useState } from "react";
import useSetNav from "../../../hooks/useSetNav";

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
  const { unit, name, _id: exerciseId } = exercise;
  const [exerciseView, setExerciseView] = useState("track");

  useSetNav({
    showDehaze: false,
    text: name,
    onBackClick: () => setShowExercise(false),
    onBackClickId: "exerciseView"
  });

  let viewDisplay;
  if (exerciseView === "track") {
    viewDisplay = (
      <TrackView
        sets={sets}
        unit={unit}
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
    <div className="pt-50 width-100vw">
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
      <div className="history-mobile-exercise-body flex-col">{viewDisplay}</div>
    </div>
  );
};

export default ExerciseView;
