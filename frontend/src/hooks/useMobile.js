import { useState, useEffect } from "react";
import useWindowWidth from "./useWindowWidth";

function useMobile() {
  const width = useWindowWidth();

  const [isMobile, setIsMobile] = useState(0);

  useEffect(() => {
    function checkWidth() {
      if (width <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    checkWidth();
  }, [width]);

  return isMobile;
}

export default useMobile;
