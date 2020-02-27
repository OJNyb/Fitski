import React, { useRef, useState } from "react";

import WebExerciseCard from "./WebExerciseCard";
import Exercises from "../../shared/Exercises/Exercises";
import useSetLoading from "../../../hooks/useSetLoading";
import WeekDropdown from "./WeekDropdown";
import { Link } from "react-router-dom";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import {
  MainContainer,
  MainTile,
  SecondTile,
  MainTileNav,
  MainTileHeader
} from "../../shared/Layout";
import MoreIcon from "../MoreIcon";
import CopyModal from "../CopyModal";
import DeleteModal from "../DeleteWeekModal";
import RepeatModal from "../RepeatModal";
import NavMidActionMenu from "../../shared/NavMid/NavMidActionMenu";

import "./webEditWeek.css";

const WebEditWeek = ({
  weeks,
  planId,
  onDragEnd,
  currentWeek,
  handleEditSet,
  handleAddSet,
  currentDayIndex,
  handleDeleteSet,
  handleAddExercise,
  setCurrentDayIndex,
  handleDeleteExercise,
  handleAddExerciseRetry,
  handleDeleteWeekSubmit,
  weekIndex,
  handleAddSetRetry,
  handleEditSetRetry,
  refreshPlan
}) => {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const moreBtn = useRef(null);
  const { days } = currentWeek;
  const currentDay = days[currentDayIndex];
  const { _id: dayId } = currentDay;
  const { exercises } = currentDay;
  const [showModal, setShowModal] = useState(false);
  const [showWeekDd, setShowWeekDd] = useState(false);
  useSetLoading(false);

  let dayBtns = days.map((day, index) => (
    <button
      key={day._id}
      onClick={() => setCurrentDayIndex(index)}
      className={currentDayIndex === index ? "edit-week-day-active" : ""}
    >
      {index + 1}
    </button>
  ));

  function handleRepeatClick() {
    setShowModal("repeat");
  }

  function handleCopyClick() {
    setShowModal("copy");
  }

  function handleDeleteClick() {
    setShowModal("delete");
  }

  let exerciseCards = exercises.map((x, y) => (
    <WebExerciseCard
      index={y}
      key={x._id}
      dayId={dayId}
      exercise={x}
      onAddSet={handleAddSet}
      handleEditSet={handleEditSet}
      handleDeleteSet={handleDeleteSet}
      onDeleteExercise={handleDeleteExercise}
      handleAddSetRetry={handleAddSetRetry}
      handleEditSetRetry={handleEditSetRetry}
      onAddExerciseRetry={handleAddExerciseRetry}
    />
  ));

  function hideModal() {
    setShowModal(false);
  }

  let modal;
  if (showModal) {
    if (showModal === "copy") {
      modal = <CopyModal weekIndex={weekIndex} hideModal={hideModal} />;
    }

    if (showModal === "delete") {
      modal = (
        <DeleteModal
          hideModal={hideModal}
          handleSubmit={handleDeleteWeekSubmit}
        />
      );
    }
    if (showModal === "repeat") {
      modal = <RepeatModal hideModal={hideModal} currentWeek={currentWeek} />;
    }
  }

  return (
    <MainContainer maxWidth={850}>
      <MainTile maxWidth={500}>
        {modal}
        <MainTileNav>
          <MainTileHeader
            text={
              <div className="flex-ai-center">
                <Link
                  to={`/plans/${planId}`}
                  className="main-tile-arrow-back theme-btn-no-border flex-center z-mid"
                >
                  <i className="material-icons font-20">arrow_back</i>
                </Link>
                Weeks
              </div>
            }
            customIcon={
              <button
                className="shadow-medium-clickable theme-btn-no-border nav-more-btn-horiz-new"
                onClick={() => setShowActionMenu(true)}
                ref={moreBtn}
              >
                <MoreIcon />
              </button>
            }
          />

          <div className="edit-week-web-nav flex-col-cen">
            <button
              className="text-center margin-0 theme-btn-no-border edit-week-nav-week-btn"
              onClick={() => setShowWeekDd(!showWeekDd)}
            >
              {weekIndex + 1}
            </button>
            {showWeekDd && (
              <WeekDropdown
                weeks={weeks}
                planId={planId}
                hideDropdown={() => setShowWeekDd(false)}
              />
            )}
            <div className="edit-week-add-days-container">{dayBtns}</div>
          </div>
          {showActionMenu && (
            <NavMidActionMenu
              children={[
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
              hideActionMenu={() => setShowActionMenu(false)}
              moreBtn={moreBtn}
            />
          )}
        </MainTileNav>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={"1"} isDropDisabled={!exercises.length}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={
                  "web-exercise-droppable-container" +
                  (snapshot.isDraggingOver
                    ? " web-exercise-container-dragging-over"
                    : "")
                }
              >
                {exerciseCards}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </MainTile>
      <SecondTile>
        <div className="flex-col-cen">
          <Exercises
            handleAddExercise={handleAddExercise}
            refreshExercises={refreshPlan}
          />
        </div>
      </SecondTile>
    </MainContainer>
  );
};

export default WebEditWeek;
