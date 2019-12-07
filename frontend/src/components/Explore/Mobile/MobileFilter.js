import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const Filter = ({ filter, setFilter }) => {
  const [showLength, setShowLength] = useState(false);
  const [showGoal, setShowGoal] = useState(false);

  function onLengthClick() {
    setShowGoal(false);
    setShowLength(!showLength);
  }

  function onGoalClick() {
    setShowGoal(!showGoal);
    setShowLength(false);
  }

  function hideDropdowns() {
    setShowGoal(false);
    setShowLength(false);
  }

  return (
    <div className="flex-ai-center explore-filter-container">
      <div className="relative">
        <button
          className="explore-filter-item-button color-gray"
          onClick={onGoalClick}
        >
          Goal
          <i className="material-icons-round">keyboard_arrow_down</i>
        </button>
        {showGoal && (
          <GoalDropdown
            filter={filter}
            setFilter={setFilter}
            onHide={hideDropdowns}
          />
        )}
      </div>
      <div className="relative m-l-10">
        <button
          className="explore-filter-item-button color-gray"
          onClick={onLengthClick}
        >
          Length
          <i className="material-icons-round">keyboard_arrow_down</i>
        </button>
        {showLength && (
          <LengthDropdown
            filter={filter}
            setFilter={setFilter}
            onHide={hideDropdowns}
          />
        )}
      </div>
    </div>
  );
};

const LengthDropdown = ({ filter, onHide, setFilter }) => {
  const [length, setLength] = useState(filter.length);

  function handleSave() {
    const newFilter = {
      ...filter,
      length
    };
    setFilter(newFilter);
    onHide();
  }

  function handleReset() {
    const newFilter = {
      ...filter,
      length: [0, 50]
    };
    setFilter(newFilter);
  }

  function onChange(e, index) {
    const {
      target: { value }
    } = e;

    if (value < 0 || value > 50 || value % 1 !== 0) return;

    if (index) {
      if (value < length[0]) return;
    } else {
      if (value > length[1]) return;
    }

    const newLength = length.concat();
    newLength[index] = value;
    setLength(newLength);
  }

  let backgroundImage = getTrackBackground({
    min: 0,
    max: 50,
    values: length,
    colors: ["#d2c7c7", "#1a1414", "#d2c7c7"]
  });

  const children = (
    <>
      <div className="explore-filter-length-input-container flex-center">
        <div className="explore-filter-length-input-wrapper">
          <input
            type="number"
            value={length[0]}
            onChange={e => onChange(e, 0)}
          />
        </div>

        <div className="explore-filter-length-seperator" />
        <div className="explore-filter-length-input-wrapper">
          <input
            type="number"
            value={length[1]}
            onChange={e => onChange(e, 1)}
          />
          {length[1] === 50 && <span>+</span>}
        </div>
      </div>

      <div className="explore-filter-range-wrapper">
        <Range
          step={1}
          min={0}
          max={50}
          values={length}
          onChange={length => setLength(length)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="explore-filter-length-bar"
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
              <div
                key={props.key}
                className="explore-filter-render-thumb"
                style={{
                  ...props.style
                }}
              ></div>
            );
          }}
        />
      </div>
    </>
  );

  return (
    <Dropdown children={children} onReset={handleReset} onSave={handleSave} />
  );
};

const GoalDropdown = ({ filter, onHide, setFilter }) => {
  const [goal, setGoal] = useState(filter.goal);

  function handleSave() {
    const newFilter = {
      ...filter,
      goal
    };

    setFilter(newFilter);
    onHide();
  }

  function handleReset() {
    const newFilter = {
      ...filter,
      goal: ""
    };
    setFilter(newFilter);
  }

  const children = (
    <div className="explore-filter-goal-input-wrapper">
      <input
        value={goal}
        onChange={e => setGoal(e.target.value)}
        placeholder="Use keywords"
      />
    </div>
  );

  return (
    <Dropdown children={children} onSave={handleSave} onReset={handleReset} />
  );
};

const Dropdown = ({ children, onSave, onReset }) => {
  return (
    <div className="explore-filter-dropdown-container">
      <div className="relative">{children}</div>
      <div className="explore-filter-dropdown-footer flex-ai-center">
        <button onClick={onReset}>Reset</button>
        <button onClick={onSave}>Save</button>
      </div>
    </div>
  );
};

export default Filter;
