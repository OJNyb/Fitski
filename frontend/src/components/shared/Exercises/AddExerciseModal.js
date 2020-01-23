import React, { lazy, useRef, useEffect, useState, Suspense } from "react";
import useMobile from "../../../hooks/useMobile";

import Label from "./AddModalLabel";
import Modal from "../Modal/Modal";
import ErrorMessage from "../Modal/ErrorMessage";
import Plus20 from "../SVGs/Plus20";
import AddCategoryModal from "./AddCategoryModal";

const loadWC = () => import("./Web/WebCategories");
const loadMC = () => import("./Mobile/MobileCategories");
const WebCategories = lazy(loadWC);
const MobileCategories = lazy(loadMC);

const AddEditModal = ({
  header,
  exercise,
  hideModal,
  buttonText,
  muscleGroups,
  handleSubmit
}) => {
  if (exercise) {
    var {
      _id: exerciseId,
      name: initName,
      muscleGroup: initMuscleGroup,
      custom
    } = exercise;
  } else {
    initName = "";
    initMuscleGroup = "";
  }

  const [name, setName] = useState(initName);
  const categoryContainer = useRef(null);
  const [muscleGroup, setMuscleGroup] = useState(initMuscleGroup);
  const [showCategories, setShowCategories] = useState(false);
  const [error, setError] = useState(null);
  const isMobile = useMobile();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isMobile) {
      loadMC();
    } else {
      loadWC();
    }
  }, [isMobile]);

  function onSubmit() {
    if (!name.length) {
      return setError("Name is required");
    }
    if (!muscleGroup) {
      return setError("Category is required");
    }

    if (buttonText === "Edit") {
      handleSubmit(exerciseId, { name, muscleGroup });
    } else {
      handleSubmit(name, muscleGroup);
    }
  }

  function handleCategoryItemClick(e, x) {
    e.stopPropagation();
    setMuscleGroup(x);
    setShowCategories(false);
  }

  let categoryDropDown;
  if (showCategories) {
    if (isMobile) {
      categoryDropDown = (
        <MobileCategories
          muscleGroups={muscleGroups}
          onItemClick={handleCategoryItemClick}
          categoryContainer={categoryContainer}
        />
      );
    } else {
      categoryDropDown = (
        <WebCategories
          selectedMG={muscleGroup}
          muscleGroups={muscleGroups}
          onClick={handleCategoryItemClick}
          hideDropdown={() => setShowCategories(false)}
        />
      );
    }
  }

  if (showModal) {
    return (
      <AddCategoryModal
        muscleGroups={muscleGroups}
        setMuscleGroup={setMuscleGroup}
        hideModal={() => setShowModal(false)}
      />
    );
  }

  let children;
  if (buttonText === "Edit" && !custom) {
    children = <p className="black mt-0">Can't edit the default exercises</p>;
  } else {
    children = (
      <>
        <div
          onClick={() => setShowCategories(false)}
          className={
            "width-100p border-box add-exercise-form-container" +
            (isMobile ? " padding-0-10-77" : "")
          }
        >
          {error && <ErrorMessage message={error} />}
          <label className="margin-0-0-20">
            <Label text={"NAME"} />
            <div className="width-90p margin-5-a fw-bc-theme relative">
              <input
                className="padding-0-5 font-17 black width-100p border-box"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <div className="border-with-sides" />
            </div>
          </label>

          <Suspense fallback={null}>{categoryDropDown}</Suspense>
          <div className="margin-0-0-20">
            <Label text={"CATEGORY"} />
            <div
              className="width-90p fw-bc-theme custom-select-upwards relative"
              onClick={e => {
                e.stopPropagation();
                setShowCategories(!showCategories);
              }}
              ref={categoryContainer}
            >
              <span className="padding-0-5 font-17 black">
                {muscleGroup.name}
              </span>
              <div className="select-triangle" />
              <button
                className="add-exercise-add-category-btn"
                onClick={e => {
                  setShowModal(true);
                  e.stopPropagation();
                }}
              >
                <Plus20 fill={"#a60000"} />
              </button>
            </div>
          </div>
        </div>
        <button
          className={
            "theme-btn-filled " +
            (isMobile ? "mobile-modal-submit-btn" : "web-modal-submit-btn")
          }
          onClick={onSubmit}
        >
          {buttonText}
        </button>
      </>
    );
  }
  return <Modal children={children} header={header} toggleModal={hideModal} />;
};

export default AddEditModal;
