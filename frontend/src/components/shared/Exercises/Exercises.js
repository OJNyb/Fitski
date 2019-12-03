import React, { lazy, useState, useEffect, useContext, Suspense } from "react";
import useMobile from "../../../hooks/useMobile";
import useSetLoading from "../../../hooks/useSetLoading";
import { ExerciseContext } from "../../../context/exerciseContext";
import {
  addExercise,
  editExercise,
  deleteExercise
} from "../../../utils/exerciseClient";

import SetLoading from "../../SetLoading";

import "./exercises.css";

const ExercisesBigView = lazy(() => import("./Web/WebExercisesView"));
const MobileExerciseView = lazy(() => import("./Mobile/MobileExerciseView"));

const Exercises = ({ handleAddExercise, closeExercises }) => {
  const { state, dispatch } = useContext(ExerciseContext);
  const [search, setSearch] = useState("");
  const [muscleGroup, setMuscleGroup] = useState([]);
  const [exercisesToShow, setExercisesToShow] = useState(null);
  const [edit, setEdit] = useState(0);

  const isMobile = useMobile();

  const { exercises, isPending, isRejected } = state;

  let length;
  if (exercises) {
    length = exercises.length;
  }

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
          return (
            regex.test(x.name) && muscleGroup.indexOf(x.muscleGroup) !== -1
          );
        });
      }

      setExercisesToShow(exercisesToShow);
    }

    filterExercises();
  }, [search, muscleGroup, isMobile, length, exercises, edit]);

  function handleAddCustomExercise(name, category) {
    addExercise(dispatch, name, category);
  }

  function handleEditExercise(exerciseId, values) {
    editExercise(dispatch, exerciseId, values);
    setEdit(edit + 1);
  }

  function handleDeleteExercises(exerciseIds) {
    deleteExercise(dispatch, exerciseIds);
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
      handleEditExercise={handleEditExercise}
      handleDeleteExercises={handleDeleteExercises}
      handleAddCustomExercise={handleAddCustomExercise}
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
      handleEditExercise={handleEditExercise}
      handleDeleteExercises={handleDeleteExercises}
      handleAddCustomExercise={handleAddCustomExercise}
    />
  );

  return <Suspense fallback={<SetLoading />}>{view}</Suspense>;
};

export default Exercises;
