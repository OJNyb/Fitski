import { useEffect, useContext } from "react";

import { NavContext } from "../context/navContext";
import { CLEAN_STATE } from "../types/navTypes";

function useNavRedBack() {
  const { dispatch } = useContext(NavContext);
  useEffect(() => {
    function cleanNav() {
      dispatch({ type: CLEAN_STATE });
    }

    cleanNav();
  }, [dispatch]);
}

export default useNavRedBack;
