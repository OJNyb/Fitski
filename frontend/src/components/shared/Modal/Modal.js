import React from "react";

import "./modal.css";

const Modal = ({ header, children, toggleModal }) => {
  return (
    <div id="myModal" className="modal" onClick={toggleModal}>
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
