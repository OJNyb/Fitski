import React from "react";
import Modal from "../shared/Modal/Modal";

const RepeatModal = ({ onSubmit, hideModal }) => {
  function onRepeatSubmit(e) {
    onSubmit("post", e.target.values);
  }
  let children = (
    <form className="repeat-week-form" onSubmit={onRepeatSubmit}>
      <input type="number" name="repeat" />
      <button className="theme-btn" type="submit">
        Confirm
      </button>
    </form>
  );

  return (
    <Modal header={"Repeat"} children={children} toggleModal={hideModal} />
  );
};

export default RepeatModal;