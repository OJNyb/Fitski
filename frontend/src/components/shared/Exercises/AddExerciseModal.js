import React, { useRef, useState } from "react";

const muscleGroupArray = [
  "Shoulders",
  "Triceps",
  "Biceps",
  "Chest",
  "Legs",
  "Back"
];

const AddExerciseModal = ({ onAddCustomExercise }) => {
  const [name, setName] = useState("");
  const categoryContainer = useRef(null);
  const [category, setCategory] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  function onSubmit() {
    if (name.length && category.length) {
      onAddCustomExercise(name, category);
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
      <div className="add-exercise-category-items-container" style={style}>
        {items}
      </div>
    );
  }

  return (
    <div onClick={() => setShowCategories(false)} className="width-100p">
      <div className="margin-a width-80p">
        <div className="margin-0-0-20">
          <div className="mobile-exercises-add-label">NAME:</div>
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
          <div className="mobile-exercises-add-label">CATEGORY:</div>
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
        Add
      </button>
    </div>
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

export default AddExerciseModal;
