import React from "react";
import Plus22 from "../../SVGs/Plus22";
import useSetNav from "../../../../hooks/useSetNav";

const MobileExercisesNav = ({
  header,
  onBackClick,
  setShowModal,
  onBackClickId
}) => {
  useSetNav({
    showDehaze: false,
    onBackClick: onBackClick,
    onBackClickId: onBackClickId,
    text: header,
    backLink: null,
    buttons: (
      <button onClick={() => setShowModal({ type: "add" })}>
        <Plus22 fill={"#fff"} />
      </button>
    )
  });

  return null;
};

export default MobileExercisesNav;
