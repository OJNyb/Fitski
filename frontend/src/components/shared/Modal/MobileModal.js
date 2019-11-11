import React from "react";
import "./modal.css";
import useSetLoading from "../../../hooks/useSetLoading";

const MobileModal = ({ header, children, toggleModal }) => {
  useSetLoading(false);

  return (
    <div id="myModal" className="modal" onClick={toggleModal}>
      <div
        className="modal-content-mobile"
        onClick={e => e.stopPropagation()}
        style={{
          borderTopLeftRadius: header ? "25px" : 0,
          borderTopRightRadius: header ? "25px" : 0
        }}
      >
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
