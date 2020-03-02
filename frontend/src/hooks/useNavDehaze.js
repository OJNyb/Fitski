import { useLayoutEffect, useContext } from "react";

import { NavContext } from "../context/navContext";
import { SHOW_DEHAZE } from "../types/navTypes";

function useNavDehaze() {
  const { dispatch } = useContext(NavContext);
  const x = useContext(NavContext);
  useLayoutEffect(() => {
    function setNav() {
      dispatch({ type: SHOW_DEHAZE });
    }

    setNav();
  }, [dispatch]);
}

export default useNavDehaze;
