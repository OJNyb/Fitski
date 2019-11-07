import { useLayoutEffect, useContext } from "react";

import { NavContext } from "../context/navContext";
import { IS_WHITE, SHOW_BACK } from "../types/navTypes";

function useNavWhiteSingleBack(backLink) {
  const { dispatch } = useContext(NavContext);
  useLayoutEffect(() => {
    function setNav() {
      dispatch({ type: IS_WHITE });
      dispatch({ type: SHOW_BACK, payload: { backLink } });
    }

    setNav();
  }, [dispatch, backLink]);
}

export default useNavWhiteSingleBack;
