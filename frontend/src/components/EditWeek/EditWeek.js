import React from "react";
import NavMid from "../shared/NavMid/NavMid";

import "./editWeek.css";

//backText, children, midContent, backAction, rightBtnText, rightBtnAction;

const EditWeek = () => {
  const navMidContent = (
    <>
      <button
        className="edit-week-nav-arrow-btn theme-btn-no-border"
        onClick={() => console.log("gay")}
      >
        <i className="material-icons">arrow_back</i>
      </button>
      <button className="edit-week-nav-week-btn">2</button>
      <button
        className="edit-week-nav-arrow-btn theme-btn-no-border"
        onClick={() => console.log("gay")}
      >
        <i className="material-icons">arrow_forward</i>
      </button>
    </>
  );

  return (
    <>
      <NavMid
        backText={"Weeks"}
        rightBtnText={"Clear"}
        actionMenuChildren={[
          {
            icon: "delete_outline",
            text: "Delete day",
            action: () => console.log("gay")
          },
          {
            icon: "add_circle_outline",
            text: "Add meal",
            action: () => console.log("gay")
          }
        ]}
        midContent={navMidContent}
      />
      <div className="edit-week-container">
        <div className="edit-week-add-container">
          <h2 className="edit-week-header">Days</h2>

          <div className="edit-week-add-days-container">
            <button className="edit-week-day-active">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>7</button>
          </div>
          <div className="edit-week-add-muscle-group-container">
            <p className="edit-week-muscle-group-label">Muscle group</p>
            <h3 className="edit-week-muscle-group">Chest</h3>
          </div>

          <div className="edit-week-add-header">
            <div className="edit-week-exercise-row">Exercise</div>
            <div className="edit-week-sets-row">Sets</div>
            <div className="edit-week-reps-row">Reps</div>
          </div>
          <div className="edit-week-add-body">
            <div className="edit-week-add-column">
              <span className="edit-week-exercise-row">
                Barbell Bench Press
              </span>
              <form>
                <div className="edit-week-sets-row">
                  <input type="number" />
                </div>
                <div className="edit-week-reps-row">
                  <input type="number" />
                </div>

                {/* <div className="edit-week-rest-row">
                  <input type="number" />

                  <select>
                    <option>Seconds</option>
                    <option selected>Minutes</option>
                  </select>
                </div> */}
              </form>
            </div>
            <div className="edit-week-add-column">
              <span className="edit-week-exercise-row">
                Barbell Bench Press
              </span>
              <form>
                <div className="edit-week-sets-row">
                  <input type="number" />
                </div>
                <div className="edit-week-reps-row">
                  <input type="number" />
                </div>
                {/* <div className="edit-week-rest-row">
                  <input type="number" />

                  <select>
                    <option>Seconds</option>
                    <option selected>Minutes</option>
                  </select>
                </div> */}
              </form>
            </div>
            <div className="edit-week-add-column">
              <span className="edit-week-exercise-row">
                Barbell Bench Press
              </span>
              <form>
                <div className="edit-week-sets-row">
                  <input type="number" />
                </div>
                <div className="edit-week-reps-row">
                  <input type="number" />
                </div>

                {/* <div className="edit-week-rest-row">
                  <input type="number" />

                  <select>
                    <option>Seconds</option>
                    <option selected>Minutes</option>
                  </select>
                </div> */}
              </form>
            </div>
          </div>
        </div>

        <div className="edit-week-exercise-container">
          <h2>Exercises</h2>
          <div className="edit-week-exercise-head">
            {/* <div className="edit-week-exercise-search-container"> */}
            <input placeholder="Search..." />
            <button className="">
              Filters <i className="material-icons">arrow_drop_down</i>
            </button>
            {/* </div> */}

            {/* <div className="edit-week-exercise-filter-container">
              <div>
                <span>Muscle group</span>
                <select>
                  <option>All</option>
                  <option>Abs</option>
                  <option>Back</option>
                  <option>Legs</option>
                  <option>Chest</option>
                  <option>Bicep</option>
                  <option>Tricep</option>
                  <option>Shoulders</option>
                </select>
              </div>

              <div>
                <span>Equipment</span>
                <select>
                  <option>All</option>
                  <option>Abs</option>
                  <option>Back</option>
                  <option>Legs</option>
                  <option>Chest</option>
                  <option>Bicep</option>
                  <option>Tricep</option>
                  <option>Shoulders</option>
                </select>
              </div>

              <div>
                <span>Type</span>
                <select>
                  <option>All</option>
                  <option>Abs</option>
                  <option>Back</option>
                  <option>Legs</option>
                  <option>Chest</option>
                  <option>Bicep</option>
                  <option>Tricep</option>
                  <option>Shoulders</option>
                </select>
              </div>
            </div> */}
          </div>
          <div className="edit-week-exercise-body">
            <div className="edit-week-exercise-item">Barbell Bench Press</div>
            <div className="edit-week-exercise-item">Barbell Bench Press</div>
            <div className="edit-week-exercise-item">Barbell Bench Press</div>
            <div className="edit-week-exercise-item">Barbell Bench Press</div>
            <div className="edit-week-exercise-item">Barbell Bench Press</div>
            <div className="edit-week-exercise-item">Barbell Bench Press</div>
            <div className="edit-week-exercise-item">Barbell Bench Press</div>
            <div className="edit-week-exercise-item">Barbell Bench Press</div>
            <div className="edit-week-exercise-item">Barbell Bench Press</div>
            <div className="edit-week-exercise-item">Barbell Bench Press</div>
            <div className="edit-week-exercise-item">Barbell Bench Press</div>
            <div className="edit-week-exercise-item">Barbell Bench Press</div>
            <div className="edit-week-exercise-item">Barbell Bench Press</div>
            <div className="edit-week-exercise-item">Barbell Bench Press</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditWeek;
