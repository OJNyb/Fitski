import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import CopyModal from "./CopyModal";
import DeleteModal from "./DeleteModal";
import RepeatModal from "./RepeatModal";

import NavMid from "../shared/NavMid/NavMid";

const EditWeekNav = ({ weeks, weekIndex, isMobile }) => {
  const { plan_id: planId } = useParams();
  const { push } = useHistory();
  const [showModal, setShowModal] = useState(false);

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

  let prevWeekId;
  let nextWeekId;

  if (weeks[weekIndex - 1]) {
    prevWeekId = weeks[weekIndex - 1]._id;
  }

  if (weeks[weekIndex + 1]) {
    nextWeekId = weeks[weekIndex + 1]._id;
  }

  const currentWeek = weeks[weekIndex];
  let modal = null;
  if (showModal) {
    if (showModal === "copy") {
      modal = (
        <CopyModal weeks={weeks} weekIndex={weekIndex} hideModal={hideModal} />
      );
    }

    if (showModal === "delete") {
      modal = (
        <DeleteModal
          hideModal={hideModal}
          prevWeekId={prevWeekId}
          nextWeekId={nextWeekId}
        />
      );
    }
    if (showModal === "repeat") {
      modal = <RepeatModal hideModal={hideModal} currentWeek={currentWeek} />;
    }
  }

  if (!isMobile) {
    let prevBtn;
    let nextBtn;

    if (prevWeekId) {
      prevBtn = (
        <button
          className="edit-week-nav-arrow-btn theme-btn-no-border"
          onClick={() => redirect(prevWeekId)}
        >
          <i className="material-icons reversed-icon">arrow_forward_ios</i>
        </button>
      );
    } else {
      prevBtn = <div className="edit-week-nav-filler" />;
    }

    if (nextWeekId) {
      nextBtn = (
        <button
          className="edit-week-nav-arrow-btn theme-btn-no-border"
          onClick={() => redirect(nextWeekId)}
        >
          <i className="material-icons">arrow_forward_ios</i>
        </button>
      );
    } else {
      nextBtn = <div className="edit-week-nav-filler" />;
    }

    var navMidContent = (
      <>
        {prevBtn}
        <button className="edit-week-nav-week-btn">{weekIndex + 1}</button>
        {nextBtn}
      </>
    );
  }

  return (
    <>
      <NavMid
        backText={"Weeks"}
        backAction={() => redirect("")}
        rightBtnText={"Clear"}
        rightBtnAction={() => console.log("gay")}
        actionMenuChildren={[
          {
            icon: "repeat",
            text: "Repeat week",
            action: handleRepeatClick,
            customClass: " nav-minified-icon"
          },
          {
            icon: "file_copy",
            text: "Copy week",
            action: handleCopyClick,
            customClass: " nav-minified-icon",
            outlined: true
          },
          {
            icon: "delete_outline",
            text: "Delete week",
            action: handleDeleteClick,
            customClass: " delete-color"
          }
        ]}
        midContent={isMobile ? null : navMidContent}
      />
      {modal}
    </>
  );
};

export default EditWeekNav;
