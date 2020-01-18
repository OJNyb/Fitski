import React, { lazy, useState, useEffect, useContext, Suspense } from "react";
import useMobile from "../../../hooks/useMobile";
import useSetLoading from "../../../hooks/useSetLoading";
import { ExerciseContext } from "../../../context/exerciseContext";
import {
  addExercise,
  retryAddExercise,
  editExercise,
  retryEditExercise,
  deleteExercise
} from "../../../utils/exerciseClient";

import ErrorPrompt from "./ErrorPrompt";
import SetLoading from "../../SetLoading";

import "./exercises.css";

const ExercisesBigView = lazy(() => import("./Web/WebExercises"));
const MobileExerciseView = lazy(() => import("./Mobile/MobileExercises"));
const loadAddExerciseModal = () => import("./AddExerciseModal");
const loadDeleteExercisesModal = () => import("./DeleteExercisesModal");
const AddExerciseModal = lazy(loadAddExerciseModal);
const DeleteExercisesModal = lazy(loadDeleteExercisesModal);

const Exercises = ({ handleAddExercise, closeExercises }) => {
  const { state, dispatch } = useContext(ExerciseContext);
  const [search, setSearch] = useState("");
  const [muscleGroup, setMuscleGroup] = useState([]);
  const [exercisesToShow, setExercisesToShow] = useState(null);
  const [edit, setEdit] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [reqError, setReqError] = useState(null);

  const isMobile = useMobile();

  const { exercises, muscleGroups, isPending, isRejected } = state;

  let length;
  if (exercises) {
    length = exercises.length;
  }

  useEffect(() => {
    loadAddExerciseModal();
    loadDeleteExercisesModal();
  }, []);

  useEffect(() => {
    function filterExercises() {
      if (!exercises) return;

      let exercisesToShow;
      if (search === "" && !muscleGroup.length && !isMobile) {
        exercisesToShow = exercises;
      } else if (search !== "" && !muscleGroup.length) {
        let regex = RegExp(search, "i");
        exercisesToShow = exercises.filter(x => regex.test(x.name));
      } else if (search === "" && muscleGroup.length) {
        exercisesToShow = exercises.filter(x => {
          return muscleGroup.indexOf(x.muscleGroup._id) !== -1;
        });
      } else {
        let regex = RegExp(search, "i");
        exercisesToShow = exercises.filter(x => {
          return (
            regex.test(x.name) && muscleGroup.indexOf(x.muscleGroup._id) !== -1
          );
        });
      }

      setExercisesToShow(exercisesToShow);
    }

    filterExercises();
  }, [search, muscleGroup, isMobile, length, exercises, edit]);

  function handleAddCustomExercise(name, category) {
    const { type } = showModal;
    addExercise(dispatch, name, category)
      .then(() => setEdit(edit + 1))
      .catch(error => {
        setReqError({
          type,
          exercises: [{ name, muscleGroup: category }],
          error
        });
      });
    setShowModal(false);
  }

  function handleEditExercise(exerciseId, values) {
    const { type, exercises } = showModal;
    const { name, category } = values;
    editExercise(dispatch, exerciseId, values)
      .then(() => {
        setEdit(edit + 1);
      })
      .catch(error => {
        setReqError({
          type,
          exercises: [{ ...exercises[0], name, muscleGroup: category }],
          error
        });
      });

    setShowModal(false);
  }

  function handleDeleteExercises(exerciseIds) {
    const { type, exercises } = showModal;
    deleteExercise(dispatch, exerciseIds).catch(error => {
      setReqError({ type, exercises, error });
    });
    setShowModal(false);
  }

  function handleAddExerciseRetry(exercise) {
    retryAddExercise(dispatch, exercise);
  }

  function handleEditExerciseRetry(exercise) {
    retryEditExercise(dispatch, exercise);
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

  let modal;
  if (showModal) {
    const { type, exercises } = showModal;
    if (type === "edit") {
      modal = (
        <AddExerciseModal
          buttonText={"Edit"}
          exercise={exercises[0]}
          header={"Edit Exercise"}
          muscleGroups={muscleGroups}
          handleSubmit={handleEditExercise}
          hideModal={() => setShowModal(false)}
        />
      );
    } else if (type === "add") {
      let exc;
      if (exercises) {
        exc = exercises[0];
      }
      modal = (
        <AddExerciseModal
          exercise={exc}
          buttonText={"Add"}
          header={"Add Exercise"}
          muscleGroups={muscleGroups}
          hideModal={() => setShowModal(false)}
          handleSubmit={handleAddCustomExercise}
        />
      );
    } else {
      modal = (
        <DeleteExercisesModal
          exercises={exercises}
          onSubmit={handleDeleteExercises}
          hideModal={() => setShowModal(false)}
        />
      );
    }
  }

  let view = isMobile ? (
    <MobileExerciseView
      search={search}
      isPending={isPending}
      muscleGroup={muscleGroup}
      muscleGroups={muscleGroups}
      setMuscleGroup={setMuscleGroup}
      closeExercises={closeExercises}
      exercisesToShow={exercisesToShow}
      onAddExercise={handleAddExercise}
      handleSearchChange={handleSearchChange}
      handleEditExercise={handleEditExercise}
      handleDeleteExercises={handleDeleteExercises}
      handleAddExerciseRetry={handleAddExerciseRetry}
      handleEditExerciseRetry={handleEditExerciseRetry}
      handleAddCustomExercise={handleAddCustomExercise}
      setShowModal={setShowModal}
    />
  ) : (
    <ExercisesBigView
      search={search}
      isPending={isPending}
      muscleGroup={muscleGroup}
      muscleGroups={muscleGroups}
      onAddExercise={handleAddExercise}
      setMuscleGroup={setMuscleGroup}
      exercisesToShow={exercisesToShow}
      handleSearchChange={handleSearchChange}
      handleSelectChange={handleSelectChange}
      handleEditExercise={handleEditExercise}
      handleDeleteExercises={handleDeleteExercises}
      handleAddExerciseRetry={handleAddExerciseRetry}
      handleEditExerciseRetry={handleEditExerciseRetry}
      handleAddCustomExercise={handleAddCustomExercise}
      setShowModal={setShowModal}
    />
  );

  return (
    <>
      <Suspense fallback={<SetLoading />}>{view}</Suspense>
      <Suspense fallback={null}>{modal}</Suspense>
      {reqError && (
        <ErrorPrompt
          data={reqError}
          onClose={() => setReqError(null)}
          onClick={() => {
            setShowModal(reqError);
            setReqError(null);
          }}
        />
      )}
    </>
  );
};

export default Exercises;
