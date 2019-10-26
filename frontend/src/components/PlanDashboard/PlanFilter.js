import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const PlanFilter = ({
  nameFilter,
  goalFilter,
  weekFilter,
  authorFilter,
  setWeekFilter,
  setNameFilter,
  setGoalFilter,
  setAuthorFilter
}) => {
  const [showFilters, setShowFilters] = useState(false);
  function onInputChange(e, index) {
    const {
      target: { value }
    } = e;

    if (value < 0 || value > 50 || value % 1 !== 0) return;

    if (index) {
      if (value < weekFilter[0]) return;
    } else {
      if (value > weekFilter[1]) return;
    }

    let newWeekFilter = weekFilter.concat();
    newWeekFilter[index] = value;
    setWeekFilter(newWeekFilter);
  }

  function onGoalChange(index) {
    let newGoalFilter = goalFilter.concat();
    newGoalFilter[index] = !goalFilter[index];
    setGoalFilter(newGoalFilter);
  }

  let backgroundImage = getTrackBackground({
    min: 0,
    max: 50,
    values: weekFilter,
    colors: ["silver", "black", "silver"]
  });

  return (
    <>
      <button
        className="theme-btn plans-filter-button"
        onClick={() => setShowFilters(!showFilters)}
      >
        Filters
      </button>
      <div
        className={
          "plans-filter-container" +
          (showFilters ? " plans-filter-container-show" : "")
        }
      >
        <div>
          <div className="plans-name-filter-container">
            <h6 className="plans-filter-category-header">Name</h6>
            <input
              placeholder={"Name"}
              value={nameFilter}
              onChange={e => setNameFilter(e.target.value)}
            />
          </div>
          <div className="plans-author-filter-container">
            <h6 className="plans-filter-category-header">Author</h6>
            <input
              value={authorFilter}
              onChange={e => setAuthorFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="plans-length-filter-container">
          <h6 className="plans-filter-category-header">Weeks</h6>

          <Range
            step={1}
            min={0}
            max={50}
            values={weekFilter}
            onChange={weekFilter => setWeekFilter(weekFilter)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="plans-filter-length-bar"
                style={{
                  ...props.style,
                  backgroundImage
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => {
              return (
                <>
                  <div
                    className="plans-filter-render-thumb"
                    style={{
                      ...props.style
                    }}
                  ></div>
                </>
              );
            }}
          />
          <div className="plans-filter-length-input-container">
            <div className="plans-filter-length-input-wrapper">
              <input
                type="number"
                value={weekFilter[0]}
                onChange={e => onInputChange(e, 0)}
              />
            </div>

            <div className="plans-filter-length-seperator" />
            <div className="plans-filter-length-input-wrapper">
              <input
                type="number"
                value={weekFilter[1]}
                onChange={e => onInputChange(e, 1)}
              />
              {weekFilter[1] === 50 && <span>+</span>}
            </div>
          </div>
        </div>
        <div className="plans-goal-filter-container">
          <h6 className="plans-filter-category-header">Goal</h6>

          <label className="custom-checkbox-container">
            <input
              type="checkbox"
              id="gainStrength"
              name="gainStrength"
              checked={goalFilter[0]}
              onChange={() => onGoalChange(0)}
            />
            Gain strength
            <span className="custom-checkmark"></span>
          </label>

          <label className="custom-checkbox-container">
            <input
              type="checkbox"
              id="gainMass"
              name="gainMass"
              checked={goalFilter[1]}
              onChange={() => onGoalChange(1)}
            />
            Gain mass
            <span className="custom-checkmark"></span>
          </label>

          <label className="custom-checkbox-container">
            <input
              type="checkbox"
              id="loseFat"
              name="loseFat"
              checked={goalFilter[2]}
              onChange={() => onGoalChange(2)}
            />
            Lose fat
            <span className="custom-checkmark"></span>
          </label>
        </div>
      </div>
    </>
  );
};

export default PlanFilter;
