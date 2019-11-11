import React, { lazy, useState, useEffect, useContext, Suspense } from "react";
import useMobile from "../../../hooks/useMobile";
import { ExerciseContext } from "../../../context/exerciseContext";
import {
  addExercise,
  editExercise,
  deleteExercise
} from "../../../utils/exerciseClient";

import SetLoading from "../../SetLoading";
import useSetLoading from "../../../hooks/useSetLoading";

import "./exerciseTable.css";

const ExercisesBigView = lazy(() => import("./ExercisesBigView"));
const MobileExerciseView = lazy(() => import("./MobileExerciseView"));

const Exercises = ({ handleAddExercise, closeExercises }) => {
  const { state, dispatch } = useContext(ExerciseContext);
  const [search, setSearch] = useState("");
  const [muscleGroup, setMuscleGroup] = useState([]);
  const [exercisesToShow, setExercisesToShow] = useState(null);
  const isMobile = useMobile();

  const { exercises, isPending, isRejected } = state;

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

  function handleAddCustomExercise(name, category) {
    addExercise(dispatch, name, category);
  }

  function handleEditCustomExercise(exerciseId, values) {
    addExercise(dispatch, exerciseId, values);
  }

  function handleDeleteCustomExercise(exerciseId) {
    deleteExercise(dispatch, exerciseId);
  }
  function handleSearchChange(e) {
    const { value } = e.target;
    setSearch(value);
  }

  function handleSelectChange(e) {
    const { value } = e.target;
    setMuscleGroup(value);
  }

  useSetLoading(isPending);

  if (isRejected) {
    return <p>Error...</p>;
  }

  let view = isMobile ? (
    <MobileExerciseView
      search={search}
      isPending={isPending}
      muscleGroup={muscleGroup}
      setMuscleGroup={setMuscleGroup}
      closeExercises={closeExercises}
      exercisesToShow={exercisesToShow}
      onAddExercise={handleAddExercise}
      handleSearchChange={handleSearchChange}
      handleAddCustomExercise={handleAddCustomExercise}
      handleEditCustomExercise={handleEditCustomExercise}
      handleDeleteCustomExercise={handleDeleteCustomExercise}
    />
  ) : (
    <ExercisesBigView
      search={search}
      isPending={isPending}
      muscleGroup={muscleGroup}
      onAddExercise={handleAddExercise}
      setMuscleGroup={setMuscleGroup}
      exercisesToShow={exercisesToShow}
      handleSearchChange={handleSearchChange}
      handleSelectChange={handleSelectChange}
    />
  );

  return <Suspense fallback={<SetLoading />}>{view}</Suspense>;
};

export default Exercises;
