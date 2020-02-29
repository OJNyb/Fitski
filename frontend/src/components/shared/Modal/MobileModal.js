import React from "react";
import "./modal.css";
import "./mobileModal.css";
import useSetLoading from "../../../hooks/useSetLoading";

const MobileModal = ({ header, children, toggleModal }) => {
  useSetLoading(false);

  return (
    <div id="myModal" className="modal" onClick={toggleModal}>
      <div className="modal-content-mobile" onClick={e => e.stopPropagation()}>
        {header && (
          <div className="mobile-modal-header black">
            <span>{header}</span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default MobileModal;
