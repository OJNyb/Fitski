import { useLayoutEffect, useContext } from "react";

import { NavContext } from "../context/navContext";
import { IS_WHITE, SHOW_DEHAZE } from "../types/navTypes";

function useNavWhiteSingleBack() {
  const { dispatch } = useContext(NavContext);
  useLayoutEffect(() => {
    function setNav() {
      dispatch({ type: IS_WHITE });
      dispatch({ type: SHOW_DEHAZE });
    }

    setNav();
  }, [dispatch]);
}

export default useNavWhiteSingleBack;
