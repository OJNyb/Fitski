import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { PlanContext } from "../../../context/planContext";

import CopyModal from "./CopyModal";
import DeleteModal from "./DeleteModal";
import RepeatModal from "./RepeatModal";

import { EDIT_WEEK, DELETE_WEEK } from "../../../reducers/planTypes";

import NavMid from "../../shared/NavMid/NavMid";

const EditWeekNav = ({
  weeks,
  weekIndex,
  history: { push },
  match: {
    params: { plan_id: planId, week_id: weekId }
  }
}) => {
  const [showModal, setShowModal] = useState(false);

  const { dispatch } = useContext(PlanContext);

  function redirect(weekId) {
    push(`/plans/${planId}/${weekId}`);
  }

  function handleRepeatClick() {
    setShowModal("repeat");
  }

  function handleCopyClick() {
    setShowModal("copy");
  }

  function handleDeleteClick() {
    setShowModal("delete");
  }

  function hideModal() {
    setShowModal(false);
  }

  function handleSubmit(method, data) {
    let request = {
      url: `/plan/week/${planId}/${weekId}`,
      method
    };

    if (data) request.data = data;

    axios(request)
      .then(res => {
        const { data: resData } = res;
        const { message } = resData;
        if (message === "success") {
          setShowModal(false);
          if (method === "delete") {
            // TODO: go to prev week
            dispatch({ type: DELETE_WEEK, payload: { weekId } });
            redirect(prevWeek || nextWeek || "");
          } else {
            dispatch({ type: EDIT_WEEK, payload: { data, weekId } });
          }
        }
      })
      .catch(err => console.log(err.response));
  }

  let modal;
  if (showModal) {
    if (showModal === "copy") {
      modal = (
        <CopyModal
          weeks={weeks}
          handleSubmit={handleSubmit}
          hideModal={hideModal}
        />
      );
    }

    if (showModal === "delete") {
      modal = <DeleteModal onDelete={handleSubmit} hideModal={hideModal} />;
    }
    if (showModal === "repeat") {
      modal = <RepeatModal onSubmit={handleSubmit} hideModal={hideModal} />;
    }
  }

  let currentWeek = weeks[weekIndex];

  let repeats = weeks
    .slice(0, weekIndex)
    .map(x => x.repeat)
    .reduce((acc, curr) => acc + curr, 0);
  let weekNumber = weekIndex + 1 + repeats;
  const { repeat } = currentWeek;
  if (repeat) weekNumber += ` - ${weekNumber + repeat}`;

  let prevWeek;
  let nextWeek;

  if (weeks[weekIndex - 1]) {
    prevWeek = weeks[weekIndex - 1]._id;
  }

  if (weeks[weekIndex + 1]) {
    nextWeek = weeks[weekIndex + 1]._id;
  }

  let prevBtn;
  let nextBtn;

  if (prevWeek) {
    prevBtn = (
      <button
        className="edit-week-nav-arrow-btn theme-btn-no-border"
        onClick={() => redirect(prevWeek)}
      >
        <i className="material-icons">arrow_back</i>
      </button>
    );
  } else {
    prevBtn = <div className="edit-week-nav-filler" />;
  }

  if (nextWeek) {
    nextBtn = (
      <button
        className="edit-week-nav-arrow-btn theme-btn-no-border"
        onClick={() => redirect(nextWeek)}
      >
        <i className="material-icons">arrow_forward</i>
      </button>
    );
  } else {
    nextBtn = <div className="edit-week-nav-filler" />;
  }

  const navMidContent = (
    <>
      {prevBtn}
      <button className="edit-week-nav-week-btn">{weekNumber}</button>
      {nextBtn}
    </>
  );

  return (
    <>
      <NavMid
        backText={"Weeks"}
        backAction={() => redirect("")}
        rightBtnText={"Clear"}
        actionMenuChildren={[
          {
            icon: "repeat",
            text: "Repeat week",
            action: handleRepeatClick,
            customClass: " nav-minified-icon"
          },
          {
            icon: "file_copy",
            text: "Copy another week",
            action: handleCopyClick,
            customClass: " nav-minified-icon",
            outlined: true
          },
          {
            icon: "delete_outline",
            text: "Delete week",
            action: handleDeleteClick
          }
        ]}
        midContent={navMidContent}
      />
      {modal}
    </>
  );
};

export default withRouter(EditWeekNav);
