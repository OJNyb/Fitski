import React, { useRef, useState } from "react";
import MobileModal from "../../Modal/MobileModal";
import Label from "../AddModalLabel";

const muscleGroupArray = [
  "Shoulders",
  "Triceps",
  "Biceps",
  "Chest",
  "Legs",
  "Back"
];

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
    const { current } = categoryContainer;

    const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = current;
    const style = {
      top: offsetTop + offsetHeight - 120 + 2 + "px",
      left: offsetLeft + "px",
      width: offsetWidth + "px"
    };

    const items = muscleGroupArray.map(x => (
      <CategoryItem
        key={x}
        mG={x}
        onClick={e => {
          e.stopPropagation();
          setCategory(x);
          setShowCategories(false);
        }}
      />
    ));

    categoryDropDown = (
      <div className="exercises-mobile-category-items-container" style={style}>
        {items}
      </div>
    );
  }

  let children;
  if (cantEdit) {
    children = <p>Can't edit the default exercises</p>;
  } else {
    children = (
      <div
        onClick={() => setShowCategories(false)}
        className="width-100p padding-0-10-77"
      >
        <div className="margin-a width-80p">
          <div className="margin-0-0-20">
            <Label text={"NAME"} />
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
          <div className="margin-0-0-20">
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
        </div>
        <button
          className="theme-btn-filled mobile-modal-submit-btn"
          onClick={onSubmit}
        >
          {buttonText}
        </button>
      </div>
    );
  }
  return (
    <MobileModal children={children} header={header} toggleModal={hideModal} />
  );
};

const CategoryItem = ({ mG, onClick }) => {
  return (
    <div
      className="flex-ai-center add-exercise-category-item-wrapper"
      onClick={onClick}
    >
      {mG}
    </div>
  );
};

export default AddEditModal;
