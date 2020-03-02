import React, {
  lazy,
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
  Suspense
} from "react";
import useMobile from "../../../hooks/useMobile";

import Label from "./AddModalLabel";
import Modal from "../Modal/Modal";
import ErrorMessage from "../Modal/ErrorMessage";
import Plus22 from "../SVGs/Plus22";
import AddCategoryModal from "./AddCategoryModal";

const loadWC = () => import("./Web/WebCategories");
const loadMC = () => import("./Mobile/MobileCategories");
const WebCategories = lazy(loadWC);
const MobileCategories = lazy(loadMC);

const types = [
  { _id: 1, name: "Weight and Reps", value: "w+r" },
  { _id: 2, name: "Weight and Time", value: "w+s" },
  { _id: 3, name: "Seconds", value: "s" },
  { _id: 4, name: "Reps", value: "r" },
  { _id: 5, name: "Weight", value: "w" }
];

const AddEditModal = ({
  header,
  exercise,
  hideModal,
  buttonText,
  muscleGroups,
  handleSubmit
}) => {
  const [name, setName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [showType, setShowType] = useState(false);
  const [error, setError] = useState(null);
  const isMobile = useMobile();
  const [selectedType, setSelectedType] = useState("");
  const [showModal, setShowModal] = useState(false);

  useLayoutEffect(() => {
    if (exercise) {
      const {
        name: initName,
        muscleGroup: initMuscleGroup,
        unit: iUnit
      } = exercise;

      var initUnitIndex = types.map(x => x.value).indexOf(iUnit);
      if (initUnitIndex === -1) {
        initUnitIndex = 0;
      }
      setSelectedType(types[initUnitIndex]);
      setName(initName);
      setMuscleGroup(initMuscleGroup);
    }
  }, [exercise]);

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
      handleSubmit(exercise._id, {
        name,
        muscleGroup,
        unit: selectedType.value
      });
    } else {
      handleSubmit(name, muscleGroup, selectedType.value);
    }
  }

  function handleCategoryClick(e) {
    e.stopPropagation();
    if (showCategories) {
      hideCategory();
    } else {
      showCategory();
    }
  }

  function handleTypeClick(e) {
    e.stopPropagation();
    if (showType) {
      hideTypes();
    } else {
      showTypes();
    }
  }

  function hideCategory() {
    setShowCategories(false);
  }

  function showCategory() {
    setShowCategories(true);
    setShowType(false);
  }

  function hideTypes() {
    setShowType(false);
  }

  function showTypes() {
    setShowType(true);
    setShowCategories(false);
  }

  function handleCategoryItemClick(e, x) {
    e.stopPropagation();
    setMuscleGroup(x);
    setShowCategories(false);
  }

  function handleTypeItemClick(e, x) {
    e.stopPropagation();
    setSelectedType(x);
    hideTypes();
  }

  let modal = null;
  if (showModal) {
    modal = (
      <AddCategoryModal
        hideModal={() => setShowModal(false)}
        muscleGroups={muscleGroups}
        setMuscleGroup={setMuscleGroup}
      />
    );
  }
  let children;
  if (buttonText === "Edit" && !exercise.custom) {
    children = <p className="black mt-0">Can't edit the default exercises</p>;
  } else {
    children = (
      <>
        {modal}
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
          <FieldWithDropDown
            label={"CATEGORY"}
            items={muscleGroups}
            selectedItem={muscleGroup}
            hideDropdown={hideCategory}
            showDropdown={showCategories}
            button={
              <button
                className="add-exercise-add-category-btn"
                onClick={e => {
                  setShowModal(true);
                  e.stopPropagation();
                }}
              >
                <Plus22 fill={"#a60000"} />
              </button>
            }
            handleInputClick={handleCategoryClick}
            handleItemClick={handleCategoryItemClick}
          />

          <FieldWithDropDown
            label={"TYPE"}
            items={types}
            selectedItem={selectedType}
            hideDropdown={hideTypes}
            showDropdown={showType}
            handleInputClick={handleTypeClick}
            handleItemClick={handleTypeItemClick}
          />
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

const FieldWithDropDown = ({
  items,
  label,
  button,
  selectedItem,
  hideDropdown,
  showDropdown,
  handleItemClick,
  handleInputClick
}) => {
  const inputEl = useRef(null);
  let isMobile = useMobile();

  let dropDown;
  if (showDropdown) {
    if (isMobile) {
      dropDown = (
        <MobileCategories
          muscleGroups={items}
          onItemClick={handleItemClick}
          categoryContainer={inputEl}
        />
      );
    } else {
      dropDown = (
        <WebCategories
          selectedMG={selectedItem}
          muscleGroups={items}
          onClick={handleItemClick}
          hideDropdown={hideDropdown}
        />
      );
    }
  }

  return (
    <>
      <Suspense fallback={null}>{dropDown}</Suspense>

      <div className="margin-0-0-20">
        <Label text={label} />
        <div
          className="width-90p fw-bc-theme custom-select-upwards relative"
          onClick={handleInputClick}
          ref={inputEl}
        >
          <span className="padding-0-5 font-17 black">{selectedItem.name}</span>
          <div className="select-triangle" />
          {button}
        </div>
      </div>
    </>
  );
};

export default AddEditModal;
