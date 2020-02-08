import React, { useState } from "react";

import DayView from "./DayView";
import Exercises from "../../shared/Exercises/Exercises";
import useSetLoading from "../../../hooks/useSetLoading";
import WebCalendar from "../../shared/Calendar/WebCalendar";
import CopyDayModal from "./CopyDayModal";
import {
  MainTileHeader,
  MainTile,
  SecondTile,
  MainContainer,
  MainTileNav
} from "../../shared/Layout";

import NoteIcon from "../NoteIcon";
import NoteModal from "../NoteModal";

import "./webHistory.css";

const WebView = ({
  date,
  dayIndex,
  currentDay,
  historyDays,
  handleAddSet,
  handleCopyDay,
  handleEditSet,
  handleEditDay,
  handleDeleteSet,
  handleDateChange,
  handleAddExercise,
  handleAddSetRetry,
  displayGroupCircle,
  handleEditSetRetry,
  handleDeleteExercise,
  handleReorderExercise,
  handleAddExerciseRetry
}) => {
  const [focused, setFocused] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useSetLoading(false);

  function handleDateClick(date) {
    handleDateChange(date);
    setFocused(false);
  }

  function handleCopyClick() {
    setShowModal(true);
  }

  function hideModal() {
    setShowModal(false);
  }

  let modal;
  if (showModal) {
    if (showModal === "copy") {
      modal = (
        <CopyDayModal
          historyDays={historyDays}
          onCopyDay={handleCopyDay}
          setShowModal={setShowModal}
          displayGroupCircle={displayGroupCircle}
        />
      );
    } else if (showModal === "note") {
      let note;
      if (currentDay) {
        note = currentDay.note;
      }
      modal = (
        <NoteModal
          pNote={note}
          hideModal={hideModal}
          onSubmit={handleEditDay}
        />
      );
    }
  }

  return (
    <>
      {modal}
      <MainContainer maxWidth={850}>
        <MainTile>
          <MainTileNav>
            <MainTileHeader
              text="Calendar"
              icon={<NoteIcon />}
              iconOnClick={() => setShowModal("note")}
            />

            <div className="flex-center">
              <WebCalendar
                date={date}
                focused={focused}
                onDateClick={handleDateClick}
                displayGroupCircle={displayGroupCircle}
                onFocusChange={({ focused }) => setFocused(focused)}
              />
            </div>
          </MainTileNav>

          <div className="flex-col-cen">
            <DayView
              dayIndex={dayIndex}
              currentDay={currentDay}
              handleAddSet={handleAddSet}
              onCopyClick={handleCopyClick}
              handleEditSet={handleEditSet}
              handleDeleteSet={handleDeleteSet}
              handleDeleteExercise={handleDeleteExercise}
              handleAddSetRetry={handleAddSetRetry}
              handleEditSetRetry={handleEditSetRetry}
              onDragEnd={handleReorderExercise}
              handleAddExerciseRetry={handleAddExerciseRetry}
            />
          </div>
        </MainTile>
        <SecondTile>
          <div className="flex-col-cen">
            <Exercises handleAddExercise={handleAddExercise} />
          </div>
        </SecondTile>
      </MainContainer>
    </>
  );
};

export default WebView;
