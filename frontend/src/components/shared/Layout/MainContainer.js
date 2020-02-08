import React from "react";

import "./layout.css";

const MainContainer = ({ maxWidth = "990px", children }) => {
  return (
    <div className="main-container" style={{ maxWidth }}>
      {children}
    </div>
  );
};

export default MainContainer;
