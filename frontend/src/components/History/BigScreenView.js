import React, { useState } from "react";

import DayView from "./DayView";
import { SingleDatePicker } from "react-dates";
import Exercises from "../shared/Exercises/Exercises";

const BigScreenView = ({
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
  const [focused, setFocused] = useState(false);

  return (
    <div className="log-container">
      <div className="log-left-container">
        <SingleDatePicker
          date={date}
          focused={focused}
          id="your_unique_id"
          onDateChange={date => onDateChange(date)}
          onFocusChange={({ focused }) => setFocused(focused)}
          isOutsideRange={() => false}
          renderDayContents={({ _d: date }) => {
            return (
              <div>
                {date.getDate()} {displayGroupCircle(date)}
              </div>
            );
          }}
        />
        <BigScreenViewLeft
          dayIndex={dayIndex}
          currentDay={currentDay}
          handleAddSet={handleAddSet}
          handleEditSet={handleEditSet}
          handleDeleteSet={handleDeleteSet}
          handleDeleteExercise={handleDeleteExercise}
        />
      </div>

      <div className="log-right-container">
        <Exercises handleAddExercise={handleAddExercise} />
      </div>
    </div>
  );
};

const BigScreenViewLeft = ({
  dayIndex,
  currentDay,
  handleAddSet,
  handleEditSet,
  handleDeleteSet,
  setShowExercises,
  handleDeleteExercise
}) => {
  return (
    <div className="history-add-container">
      <DayView
        dayIndex={dayIndex}
        currentDay={currentDay}
        handleAddSet={handleAddSet}
        handleEditSet={handleEditSet}
        handleDeleteSet={handleDeleteSet}
        setShowExercises={setShowExercises}
        handleDeleteExercise={handleDeleteExercise}
      />
    </div>
  );
};

export default BigScreenView;
