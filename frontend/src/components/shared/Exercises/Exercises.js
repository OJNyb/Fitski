import React, { useState, useEffect, useContext } from "react";
import { GET_EXERCISES } from "../../../types/exerciseTypes";
import { ExerciseContext } from "../../../context/exerciseContext";
import useMobile from "../../../hooks/useMobile";

import ExercisesBigView from "./ExercisesBigView";
import MobileExerciseView from "./MobileExerciseView";

import "./exerciseTable.css";

const Exercises = ({ handleAddExercise }) => {
  const { exerciseState, exerciseDispatch } = useContext(ExerciseContext);
  const [search, setSearch] = useState("");
  const [muscleGroup, setMuscleGroup] = useState([]);
  const [exercisesToShow, setExercisesToShow] = useState(null);
  const isMobile = useMobile();

  const { exercises, isPending, isRejected } = exerciseState;

  useEffect(() => {
    function getExercises() {
      if (!exercises) {
        exerciseDispatch({ type: GET_EXERCISES });
      }
    }

    getExercises();
  }, [exerciseDispatch]);

  useEffect(() => {
    function filterExercises() {
      if (!exercises) return;

      let exercisesToShow;
      if (search === "" && muscleGroup === "All" && isMobile) {
        return null;
      } else if (search === "" && !muscleGroup.length && !isMobile) {
        exercisesToShow = exercises;
      } else if (search !== "" && !muscleGroup.length) {
        let regex = RegExp(search, "i");
        exercisesToShow = exercises.filter(x => regex.test(x.name));
      } else if (search === "" && muscleGroup.length) {
        exercisesToShow = exercises.filter(
          x => muscleGroup.indexOf(x.muscleGroup) !== -1
        );
      } else {
        let regex = RegExp(search, "i");
        exercisesToShow = exercises.filter(x => {
          return regex.test(x.name) && x.muscleGroup === muscleGroup;
        });
      }

      setExercisesToShow(exercisesToShow);
    }

    filterExercises();
  }, [search, muscleGroup, isMobile, exercises]);

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

  if (isPending) {
    return <p>Loading..</p>;
  }

  let view = isMobile ? (
    <MobileExerciseView
      search={search}
      isPending={isPending}
      muscleGroup={muscleGroup}
      onAddExercise={handleAddExercise}
      setMuscleGroup={setMuscleGroup}
      exercisesToShow={exercisesToShow}
      exercisesToShow={exercisesToShow}
      handleSearchChange={handleSearchChange}
    />
  ) : (
    <ExercisesBigView
      search={search}
      isPending={isPending}
      muscleGroup={muscleGroup}
      onAddExercise={handleAddExercise}
      setMuscleGroup={setMuscleGroup}
      exercisesToShow={exercisesToShow}
      exercisesToShow={exercisesToShow}
      handleSearchChange={handleSearchChange}
      handleSelectChange={handleSelectChange}
    />
  );

  return <>{view}</>;
};

export default Exercises;
