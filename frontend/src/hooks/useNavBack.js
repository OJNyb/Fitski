import { useLayoutEffect, useContext } from "react";

import { NavContext } from "../context/navContext";
import { SHOW_BACK } from "../types/navTypes";

function useNavRedBack(backLink) {
  const { dispatch } = useContext(NavContext);
  useLayoutEffect(() => {
    function setNav() {
      dispatch({ type: SHOW_BACK, payload: { backLink } });
    }

    setNav();
  }, [dispatch, backLink]);
}

export default useNavRedBack;
