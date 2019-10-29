import React, { useState } from "react";
import "./exerciseView.css";

const ExerciseView = ({}) => {
  const [exercise, selectedSet, setSelectedSet] = useState(null);

  const { weight, reps } = selectedSet;
  return (
    <>
      <div className="history-mobile-exercise-header">
        <div className="history-mobile-exercise-header-item history-mobile-exercise-header-active">
          Track
        </div>
        <div className="history-mobile-exercise-header-item">History</div>
        <div className="history-mobile-exercise-header-item">Graph</div>
      </div>
      <div className="history-mobile-exercise-body">
        <div className="history-mobile-exercise-input-wrapper">
          <div className="history-mobile-exercise-input-header">
            WEIGHT (kgs):
          </div>
          <div className="history-mobile-exercise-input-box">
            <button>
              <i className="material-icons">remove</i>
            </button>
            <div className="history-mobile-exercise-input-shiizz">
              <input type="number" value="120.0" />
              <div className="border-with-sides"></div>
            </div>
            <button>
              <span>+</span>
            </button>
          </div>
        </div>
        <div className="history-mobile-exercise-input-wrapper">
          <div className="history-mobile-exercise-input-header">REPS:</div>
          <div className="history-mobile-exercise-input-box">
            <button>
              <i className="material-icons">remove</i>
            </button>
            <div className="history-mobile-exercise-input-shiizz">
              <input type="number" value="3" />
              <div className="border-with-sides"></div>
            </div>
            <button>
              <span>+</span>
            </button>
          </div>
        </div>
        <div className="history-mobile-exercise-button-container">
          <button className="history-mobile-exercise-save-btn">
            <span>SAVE</span>
          </button>
          <button className="history-mobile-exercise-clear-btn">
            <span>CLEAR</span>
          </button>
        </div>
        <div className="history-mobile-exercise-list-container">
          <div className="history-mobile-exercise-list-item">
            <div className="history-mobile-exercise-list-action-index">
              <i className="material-icons">comment</i>
              <span className="history-mobile-exercise-list-bold-span">1</span>
            </div>
            <div className="history-mobile-exercise-list-kg-reps">
              <div className="history-mobile-exercise-list-label-wrapper">
                <span className="history-mobile-exercise-list-bold-span">
                  100.0
                </span>
                <span className="history-mobile-exercise-list-small-span">
                  kgs
                </span>
              </div>
              <div className="history-mobile-exercise-list-label-wrapper">
                <span className="history-mobile-exercise-list-bold-span">
                  6
                </span>
                <span className="history-mobile-exercise-list-small-span">
                  reps
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExerciseView;
