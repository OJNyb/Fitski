import React from "react";
import MobileModal from "./MobileModal";
import useMobile from "../../../hooks/useMobile";

import "./modal.css";

const Modal = props => {
  const isMobile = useMobile();

  if (isMobile) {
    return <MobileModal {...props} />;
  } else {
    return <BigViewModal {...props} />;
  }
};

const BigViewModal = ({ header, children, toggleModal }) => {
  return (
    <div
      id="myModal"
      className="modal"
      onClick={toggleModal}
      style={{
        top: "66px"
      }}
    >
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button
          onClick={toggleModal}
          className="close-modal-btn theme-btn-no-border"
        >
          <i className="material-icons">close</i>
        </button>
        <h2>{header}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
