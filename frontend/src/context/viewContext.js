import React, { useState, createContext, useLayoutEffect } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

const ViewContext = createContext();

function ViewProvider(props) {
  const width = useWindowWidth();

  const [isMobile, setIsMobile] = useState(true);

  useLayoutEffect(() => {
    function checkWidth() {
      if (width <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    checkWidth();
  }, [width]);

  return <ViewContext.Provider value={isMobile} {...props} />;
}

export { ViewProvider, ViewContext };
