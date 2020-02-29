import React, { useState } from "react";
import { useParams } from "react-router-dom";

import CopyModal from "../CopyModal";
import DeleteModal from "../DeleteWeekModal";
import RepeatModal from "../RepeatModal";
import useSetNav from "../../../hooks/useSetNav";
import Plus22 from "../../shared/SVGs/Plus22";
import MobileMore from "../../shared/NavMid/MobileMore";

const EditWeekNav = ({
  weeks,
  weekIndex,
  setShowExercises,
  handleDeleteWeekSubmit
}) => {
  const { plan_id: planId } = useParams();
  const [showModal, setShowModal] = useState(false);

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

  const currentWeek = weeks[weekIndex];
  let modal = null;
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

  let moreBtn = (
    <MobileMore
      menuChildren={[
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
    />
  );

  useSetNav({
    showDehaze: false,
    backLink: `/plans/${planId}`,
    text: "Weeks",
    buttons: (
      <>
        <button
          className="theme-btn-no-border"
          onClick={() => setShowExercises(true)}
        >
          <Plus22 fill={"#fff"} />
        </button>
        {moreBtn}
      </>
    )
  });
  return modal;
};

export default EditWeekNav;
