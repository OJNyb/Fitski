import { useLayoutEffect, useContext } from "react";
import { NavContext } from "../context/navContext";
import { SET_NAV } from "../types/navTypes";

function useSetNav(payload) {
  const { state, dispatch } = useContext(NavContext);
  useLayoutEffect(() => {
    function setNav() {
      dispatch({ type: SET_NAV, payload });
    }

    let run = false;
    for (var key of Object.keys(payload)) {
      if (key === "buttons" || key === "onBackClick") {
        continue;
      }
      if (payload[key] !== state[key]) {
        run = true;
        break;
      }
    }

    if (run) {
      setNav();
    }
  }, [state, payload, dispatch]);
}

export default useSetNav;
