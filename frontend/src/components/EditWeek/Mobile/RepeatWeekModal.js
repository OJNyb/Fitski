import React from "react";
import MobileModal from "../../shared/Modal/MobileModal";

const RepeatWeekModal = ({
  onSubmit,
  hideModal,
  timesToRepeat,
  setTimesToRepeat
}) => {
  function onChange(e) {
    const { value, validity } = e.target;
    if (validity.valid && value % 1 === 0 && value < 100)
      setTimesToRepeat(value);
  }

  function onClick(value) {
    if (value > 0) {
      setTimesToRepeat(Number(timesToRepeat) + value);
    }
  }
  let children = (
    <div className="add-weeks-modal-mobile-container">
      <div className="add-weeks-modal-mobile-input-wrapper">
        <button
          onClick={() => {
            onClick(-1);
          }}
        >
          <div className="minus-container">
            <div />
          </div>
        </button>
        <div className="add-weeks-modal-mobile-input-shiizz">
          <input
            type="tel"
            value={timesToRepeat}
            onChange={onChange}
            pattern="^[0-9]\d*\.?\d*$"
          />
          <div className="border-with-sides" />
        </div>
        <button onClick={() => onClick(1)}>
          <div className="plus-container">
            <div />
            <div />
          </div>
        </button>
      </div>

      <button className={"mobile-modal-submit-btn"} onClick={onSubmit}>
        Confirm
      </button>
    </div>
  );

  return (
    <MobileModal
      header={"Repeat week"}
      children={children}
      toggleModal={hideModal}
    />
  );
};

export default RepeatWeekModal;
