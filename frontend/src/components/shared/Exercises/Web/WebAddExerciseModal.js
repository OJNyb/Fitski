import React, { useRef, useState } from "react";
import Modal from "../../Modal/WebModal";
import Label from "../AddModalLabel";
import MuscleGroupDropdown from "./MuscleGroupDropdown";

const AddEditModal = ({
  header,
  cantEdit,
  hideModal,
  buttonText,
  initName = "",
  initCategory = "",
  handleSubmit
}) => {
  const [name, setName] = useState(initName);
  const categoryContainer = useRef(null);
  const [category, setCategory] = useState(initCategory);
  const [showCategories, setShowCategories] = useState(false);

  function onSubmit() {
    if (name.length && category.length) {
      handleSubmit(name, category);
    }
  }
  let categoryDropDown;
  if (showCategories) {
    categoryDropDown = (
      <MuscleGroupDropdown
        muscleGroup={[category]}
        hideDropdown={() => setShowCategories(false)}
        onMuscleGroupCheck={m => {
          setCategory(m);
          setShowCategories(false);
        }}
      />
    );
  }

  let children;
  if (cantEdit) {
    children = <p>Can't edit the default exercises</p>;
  } else {
    children = (
      <div
        onClick={() => setShowCategories(false)}
        className="web-exercises-add-exercise-modal flex-col-cen"
      >
        <div className="margin-0-0-20 width-100p">
          <Label text="NAME" />
          <div className="width-90p margin-5-a fw-bc-theme">
            <input
              className="padding-0-5 font-17 black"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <div className="border-with-sides" />
          </div>
        </div>

        {categoryDropDown}
        <div className="margin-0-0-20 width-100p">
          <Label text={"CATEGORY"} />
          <div
            className="width-90p margin-5-a fw-bc-theme custom-select-upwards"
            onClick={e => {
              e.stopPropagation();
              setShowCategories(!showCategories);
            }}
            ref={categoryContainer}
          >
            <span className="padding-0-5 font-17 black">{category}</span>
            <div className="select-triangle" />
          </div>
        </div>

        <button
          className="theme-btn-filled bs-modal-submit-btn"
          onClick={onSubmit}
        >
          {buttonText}
        </button>
      </div>
    );
  }
  return <Modal children={children} header={header} toggleModal={hideModal} />;
};

export default AddEditModal;
