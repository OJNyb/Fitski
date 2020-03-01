import React, { useState } from "react";
import useMobile from "../../../hooks/useMobile";
import { SecondTileContext } from "../../../context/secondTileContext";

const SecondTile = ({ children }) => {
  const isMobile = useMobile();
  const [showModal, setShowModal] = useState({ el: null });

  return (
    <>
      {showModal.el}
      <div
        className="second-tile flex-col-cen"
        style={{
          display: isMobile ? "none" : "flex"
        }}
      >
        <div className="second-tile-wrapper flex-col-cen">
          <SecondTileContext.Provider value={{ showModal, setShowModal }}>
            <div>{children}</div>
          </SecondTileContext.Provider>
        </div>
      </div>
    </>
  );
};

export default SecondTile;
