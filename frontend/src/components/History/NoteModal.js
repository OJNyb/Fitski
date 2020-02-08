import React, { useState } from "react";
import Modal from "../shared/Modal/Modal";
import MobileInput from "../shared/Form/MobileInput";
import useMobile from "../../hooks/useMobile";

const CopyDayModal = ({ pNote, onSubmit, hideModal }) => {
  const isMobile = useMobile();

  const [note, setNote] = useState(pNote || "");
  function onCopySubmit() {
    onSubmit(note);
    hideModal();
  }

  let btnText;
  if (!pNote || pNote === "") {
    btnText = "Add Note";
  } else {
    btnText = "Edit Note";
  }

  const children = (
    <div className={"history-note-container" + (isMobile ? " pb-50" : "")}>
      <MobileInput
        label={"Note"}
        textarea={true}
        autoComplete={"off"}
        verticalResize={true}
        field={{
          name: "note",
          value: note,
          onChange: e => setNote(e.target.value)
        }}
        form={{
          touched: {},
          errors: {}
        }}
      />
      {pNote !== note && (
        <button
          className={
            "theme-btn-filled " +
            (isMobile ? "mobile-modal-submit-btn" : "web-modal-submit-btn")
          }
          onClick={onCopySubmit}
        >
          {btnText}
        </button>
      )}
    </div>
  );

  return <Modal header={"Note"} children={children} toggleModal={hideModal} />;
};

export default CopyDayModal;
