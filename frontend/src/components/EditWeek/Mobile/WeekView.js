import React, { useState } from "react";
import NavMid from "../../shared/NavMid/NavMid";
import MobileDouble from "../../shared/NavMid/MobileDouble";
import EditHistoryDownNav from "../../shared/NavMid/EditHistoryDownNav";
import useNavWhiteDoubleBack from "../../../hooks/useNavWhiteDoubleBack";

import "./EditWeekMobile.css";

const WeekView = ({ currentWeek }) => {
  const [currentDayIndex, setCurrentDay] = useState(0);
  // useNavWhiteDoubleBack("/plans");

  const { days } = currentWeek;
  const currentDay = days[currentDayIndex];
  const { _id: dayId } = currentDay;

  // let dayBtns = days.map((day, index) => (
  //   <button
  //     key={day._id}
  //     onClick={() => setCurrentDay(index)}
  //     className={currentDayIndex === index ? "edit-week-day-active" : ""}
  //   >
  //     {index + 1}
  //   </button>
  // ));

  let topNavContent = null;
  // let topNavContent = (
  //   <>
  //     <button className="white-material-btn" onClick={() => 0}>
  //       <i className="material-icons material-icons-22">calendar_today</i>
  //     </button>
  //     <button className="white-material-btn" onClick={() => 0}>
  //       <i className="material-icons material-icons-30">add</i>
  //     </button>
  //   </>
  // );

  let bottomNavContent;
  // = (
  //   <EditHistoryDownNav
  //     centerText={2}
  //     leftArrowAction={() => 0}
  //     rightArrowAction={() => 0}
  //   />
  // );

  return (
    <>
      <NavMid
        customNav={
          <MobileDouble
            topContent={topNavContent}
            bottomContent={bottomNavContent}
          />
        }
      />
      <div>
        <div className="edit-week-mobile-head-container">
          <div className="edit-week-mobile-date-btn">
            <span>Week</span>
            <div className="edit-week-mobile-pm-container">
              <div className="minus-container">
                <div />
              </div>
              <div className="plus-container">
                <div />
                <div />
              </div>
            </div>

            <span>1</span>
          </div>

          <div className="edit-week-mobile-date-btn">
            <span>Day</span>
            <span>3</span>
          </div>
        </div>

        <div class="history-add-body">
          <div class="history-add-card">
            <div class="history-exercise-name">
              <span class="">Incline Dumbbell Fly</span>
              <div class="add-card-btn-container">
                <button class="theme-btn-no-border">
                  <i class="material-icons ">add</i>
                </button>
                <button class="add-card-remove-btn theme-btn-no-border">
                  <i class="material-icons ">delete_outline</i>
                </button>
              </div>
            </div>
            <div class="add-card-body">
              <div class="add-card-column">
                <div class="history-set-row">
                  <div class="history-row">
                    0.0<span>kg</span>
                  </div>
                  <div class="history-row">
                    3<span>reps</span>
                  </div>
                </div>
              </div>
              <div class="add-card-column">
                <div class="history-set-row">
                  <div class="history-row">
                    0.0<span>kg</span>
                  </div>
                  <div class="history-row">
                    3<span>reps</span>
                  </div>
                </div>
              </div>
              <div class="add-card-column">
                <div class="history-set-row">
                  <div class="history-row">
                    0.0<span>kg</span>
                  </div>
                  <div class="history-row">
                    3<span>reps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="history-add-card">
            <div class="history-exercise-name">
              <span class="">Seated Dumbbell Press</span>
              <div class="add-card-btn-container">
                <button class="theme-btn-no-border">
                  <i class="material-icons ">add</i>
                </button>
                <button class="add-card-remove-btn theme-btn-no-border">
                  <i class="material-icons ">delete_outline</i>
                </button>
              </div>
            </div>
            <div class="add-card-body">
              <div class="add-card-column">
                <div class="history-set-row">
                  <div class="history-row">
                    0.0<span>kg</span>
                  </div>
                  <div class="history-row">
                    3<span>reps</span>
                  </div>
                </div>
              </div>
              <div class="add-card-column">
                <div class="history-set-row">
                  <div class="history-row">
                    0.0<span>kg</span>
                  </div>
                  <div class="history-row">
                    3<span>reps</span>
                  </div>
                </div>
              </div>
              <div class="add-card-column">
                <div class="history-set-row">
                  <div class="history-row">
                    0.0<span>kg</span>
                  </div>
                  <div class="history-row">
                    3<span>reps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="history-add-card">
            <div class="history-exercise-name">
              <span class="">Dips</span>
              <div class="add-card-btn-container">
                <button class="theme-btn-no-border">
                  <i class="material-icons ">add</i>
                </button>
                <button class="add-card-remove-btn theme-btn-no-border">
                  <i class="material-icons ">delete_outline</i>
                </button>
              </div>
            </div>
            <div class="add-card-body">
              <div class="add-card-column">
                <div class="history-set-row">
                  <div class="history-row">
                    0.0<span>kg</span>
                  </div>
                  <div class="history-row">
                    4<span>reps</span>
                  </div>
                </div>
              </div>
              <div class="add-card-column">
                <div class="history-set-row">
                  <div class="history-row">
                    0.0<span>kg</span>
                  </div>
                  <div class="history-row">
                    5<span>reps</span>
                  </div>
                </div>
              </div>
              <div class="add-card-column">
                <div class="history-set-row">
                  <div class="history-row">
                    0.0<span>kg</span>
                  </div>
                  <div class="history-row">
                    5<span>reps</span>
                  </div>
                </div>
              </div>
              <div class="add-card-column">
                <div class="history-set-row">
                  <div class="history-row">
                    0.0<span>kg</span>
                  </div>
                  <div class="history-row">
                    5<span>reps</span>
                  </div>
                </div>
              </div>
              <div class="add-card-column">
                <div class="history-set-row">
                  <div class="history-row">
                    0.0<span>kg</span>
                  </div>
                  <div class="history-row">
                    5<span>reps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeekView;
