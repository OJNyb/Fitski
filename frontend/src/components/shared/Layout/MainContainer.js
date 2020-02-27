import React from "react";

import "./layout.css";
import useMobile from "../../../hooks/useMobile";

const MainContainer = ({ maxWidth = "990px", children }) => {
  const isMobile = useMobile();
  let marginTop = isMobile ? "50px" : "";

  return (
    <div className="main-container" style={{ maxWidth, marginTop }}>
      {children}
    </div>
  );
};

export default MainContainer;
