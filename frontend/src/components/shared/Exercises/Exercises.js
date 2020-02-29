import React, {
  lazy,
  useState,
  useEffect,
  useContext,
  useCallback,
  Suspense
} from "react";
import useMobile from "../../../hooks/useMobile";
import useSetLoading from "../../../hooks/useSetLoading";
import { ExerciseContext } from "../../../context/exerciseContext";
import { useSecondTile } from "../../../context/secondTileContext";

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

const Exercises = ({ handleAddExercise, closeExercises, refreshExercises }) => {
  const { state, dispatch } = useContext(ExerciseContext);
  const [search, setSearch] = useState("");
  const [muscleGroup, setMuscleGroup] = useState([]);
  const [exercisesToShow, setExercisesToShow] = useState([]);
  const [edit, setEdit] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [reqError, setReqError] = useState(null);
  const [displayModal, setDisplayModal] = useState(null);

  const {
    showModal: showModalTile,
    setShowModal: setShowModalTile
  } = useSecondTile();
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

  const hideModal = useCallback(() => {
    setShowModal(false);
    if (isMobile) {
      setDisplayModal(null);
    } else {
      setShowModalTile(null);
    }
  }, [isMobile, setShowModal, setDisplayModal, setShowModalTile]);

  const handleAddCustomExercise = useCallback(
    (name, category, unit) => {
      const { type } = showModal;
      addExercise(dispatch, name, category, unit)
        .then(() => setEdit(edit + 1))
        .catch(error => {
          setReqError({
            type,
            exercises: [{ name, muscleGroup: category, unit }],
            error
          });
        });
      hideModal();
    },
    [dispatch, edit, hideModal, showModal]
  );

  const handleEditExercise = useCallback(
    (exerciseId, values) => {
      const { type, exercises } = showModal;
      const { name, category, unit } = values;
      editExercise(dispatch, exerciseId, values)
        .then(() => {
          setEdit(edit + 1);
          refreshExercises();
        })
        .catch(error => {
          setReqError({
            type,
            exercises: [{ ...exercises[0], name, muscleGroup: category, unit }],
            error
          });
        });

      hideModal();
    },
    [dispatch, edit, hideModal, refreshExercises, showModal]
  );

  const handleDeleteExercises = useCallback(
    exerciseIds => {
      const { type, exercises } = showModal;
      deleteExercise(dispatch, exerciseIds).catch(error => {
        setReqError({ type, exercises, error });
      });
      hideModal();
    },
    [dispatch, showModal, hideModal]
  );

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

  useEffect(() => {
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
            hideModal={hideModal}
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
            hideModal={hideModal}
            handleSubmit={handleAddCustomExercise}
          />
        );
      } else if (type === "delete") {
        modal = (
          <DeleteExercisesModal
            exercises={exercises}
            onSubmit={handleDeleteExercises}
            hideModal={hideModal}
          />
        );
      }
    }

    if (modal) {
      if (isMobile) {
        setDisplayModal(modal);
      } else if (showModalTile !== modal) {
        setShowModalTile(modal);
      }
    }
  }, [
    showModal,
    handleAddCustomExercise,
    handleDeleteExercises,
    handleEditExercise,
    hideModal,
    isMobile,
    muscleGroups,
    setShowModalTile,
    showModalTile
  ]);

  if (isRejected) {
    return <p>Error...</p>;
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
      <Suspense fallback={null}>{displayModal}</Suspense>
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
