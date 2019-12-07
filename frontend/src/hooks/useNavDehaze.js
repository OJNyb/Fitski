import { useLayoutEffect, useContext } from "react";

import { NavContext } from "../context/navContext";
import { SHOW_DEHAZE } from "../types/navTypes";

function useNavRedDehaze() {
  const { dispatch } = useContext(NavContext);
  useLayoutEffect(() => {
    function setNav() {
      dispatch({ type: SHOW_DEHAZE });
    }

    setNav();
  }, [dispatch]);
}

export default useNavRedDehaze;
