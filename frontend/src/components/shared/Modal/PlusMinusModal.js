import React from "react";
import Modal from "./Modal";
import useMobile from "../../../hooks/useMobile";
import Plus24 from "../SVGs/Plus24";
import Minus24 from "../SVGs/Minus24";
import ErrorMessage from "./ErrorMessage";

import "./plusMinusModal.css";

const PlusMinusModal = ({
  value,
  setValue,
  header,
  btnText,
  onSubmit,
  hideModal,
  isRejected,
  isPending
}) => {
  const isMobile = useMobile();

  function onWeekChange(e) {
    const { value, validity } = e.target;
    if (validity.valid && value % 1 === 0 && value < 51) setValue(value);
  }
  let children = (
    <div className={isMobile ? "plus-minus-modal-container" : "flex-col-cen"}>
      {isRejected && (
        <ErrorMessage message="Couldn't apply update, please try again" />
      )}
      <div className="plus-minus-modal-input-wrapper">
        <button
          onClick={() => {
            if (value > 0) setValue(Number(value) - 1);
          }}
        >
          <Minus24 fill={"#a60000"} />
        </button>
        <div className="plus-minus-modal-input-shiizz">
          <input
            type="tel"
            value={value}
            onChange={onWeekChange}
            pattern="^[0-9]\d*\.?\d*$"
          />
          <div className="border-with-sides" />
        </div>
        <button onClick={() => setValue(Number(value) + 1)}>
          <Plus24 fill={"#a60000"} />
        </button>
      </div>

      <button
        className={
          "theme-btn-filled " +
          (isMobile ? "mobile-modal-submit-btn" : "web-modal-submit-btn")
        }
        onClick={onSubmit}
        disabled={isPending}
      >
        {btnText}
      </button>
    </div>
  );

  return <Modal header={header} children={children} toggleModal={hideModal} />;
};

export default PlusMinusModal;
