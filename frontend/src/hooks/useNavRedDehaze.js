import { useLayoutEffect, useContext } from "react";

import { NavContext } from "../context/navContext";
import { IS_RED, SHOW_DEHAZE } from "../types/navTypes";

function useNavRedDehaze() {
  const { dispatch } = useContext(NavContext);
  useLayoutEffect(() => {
    function setNav() {
      dispatch({ type: IS_RED });
      dispatch({ type: SHOW_DEHAZE });
    }

    setNav();
  }, [dispatch]);
}

export default useNavRedDehaze;
