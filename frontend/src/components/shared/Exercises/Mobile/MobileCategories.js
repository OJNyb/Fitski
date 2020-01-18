import React from "react";

const Categories = ({ onItemClick, muscleGroups, categoryContainer }) => {
  const { current } = categoryContainer;

  if (!current) return null;

  const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = current;
  const elHeight = Math.round(muscleGroups.length / 2) * 44 + 2;

  let maxHeightDiff = 0;
  if (elHeight > 170) {
    maxHeightDiff = elHeight - 170;
  }
  const style = {
    top: offsetTop + offsetHeight - elHeight + maxHeightDiff - 4 + "px",
    left: offsetLeft + "px",
    width: offsetWidth + "px"
  };

  const items = muscleGroups.map(x => (
    <CategoryItem key={x._id} mG={x} onClick={onItemClick} />
  ));

  return (
    <>
      <div className="margin-a width-80p">
        <div
          className="exercises-mobile-category-items-container"
          style={style}
        >
          {items}
        </div>
      </div>
    </>
  );
};

const CategoryItem = ({ mG, onClick }) => {
  return (
    <div
      className="flex-ai-center add-exercise-category-item-wrapper"
      onClick={e => onClick(e, mG)}
    >
      {mG.name}
    </div>
  );
};

export default Categories;
