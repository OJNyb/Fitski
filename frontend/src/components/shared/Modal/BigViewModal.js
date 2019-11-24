import React from "react";
import useSetLoading from "../../../hooks/useSetLoading";

import "./modal.css";
import "./webModal.css";

const BigViewModal = ({ header, children, toggleModal }) => {
  useSetLoading(false);

  return (
    <div id="myModal" className="modal" onClick={toggleModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header padding-10">
          <button
            onClick={toggleModal}
            className="close-modal-btn theme-btn-no-border"
          >
            <i className="material-icons">close</i>
          </button>
          <h2 className="black margin-0">{header}</h2>
        </div>
        <div className="padding-10-15">{children}</div>
      </div>
    </div>
  );
};

export default BigViewModal;
