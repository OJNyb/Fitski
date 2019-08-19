import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { ExerciseContext } from "../../../context/exerciseContext";
import { GET_EXERCISES } from "../../../reducers/exerciseTypes";

const Exercises = ({ onAddExercise }) => {
  const { exerciseState, exerciseDispatch } = useContext(ExerciseContext);
  const [search, setSearch] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("All");

  const { exercises, error, isPending, isRejected } = exerciseState;

  useEffect(() => {
    function getExercises() {
      exerciseDispatch({ type: GET_EXERCISES });
    }

    getExercises();
  }, []);

  function handleSearchChange(e) {
    const { value } = e.target;
    setSearch(value);
  }

  function handleSelectChange(e) {
    const { value } = e.target;
    setMuscleGroup(value);
  }

  if (isRejected) {
    return <p>Error...</p>;
  }

  let exercisesDisplay;

  if (isPending) exercisesDisplay = <p>Loading...</p>;

  if (exercises) {
    let exercisesToShow;
    if (search === "" && muscleGroup === "All") {
      exercisesToShow = exercises;
    } else if (search !== "" && muscleGroup === "All") {
      let regex = RegExp(search, "i");
      exercisesToShow = exercises.filter(x => regex.test(x.name));
    } else if (search === "" && muscleGroup !== "All") {
      exercisesToShow = exercises.filter(x => x.muscleGroup === muscleGroup);
    } else {
      let regex = RegExp(search, "i");
      exercisesToShow = exercises.filter(x => {
        return regex.test(x.name) && x.muscleGroup === muscleGroup;
      });
    }

    exercisesDisplay = exercisesToShow.map(x => (
      <div
        className="edit-week-exercise-item"
        key={x._id}
        onClick={() => onAddExercise(x)}
      >
        {x.name}
      </div>
    ));
  }

  return (
    <div className="edit-week-exercise-container">
      <h2>Exercises</h2>
      <div className="edit-week-exercise-head">
        <input
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
        />

        <div className="edit-week-exercise-filter-container">
          <span>Muscle group</span>
          <select onChange={handleSelectChange} selected={muscleGroup}>
            <option>All</option>
            <option>Abs</option>
            <option>Back</option>
            <option>Legs</option>
            <option>Chest</option>
            <option>Biceps</option>
            <option>Triceps</option>
            <option>Shoulders</option>
          </select>
        </div>
      </div>
      <div className="edit-week-exercise-body">{exercisesDisplay}</div>
    </div>
  );
};

export default withRouter(Exercises);
