import { useLayoutEffect } from "react";
import { useLoading } from "../context/loadingContext";

import { IS_LOADING, IS_SETTLED } from "../types/loadingTypes";

function useSetLoading(isPending) {
  const { state, dispatch } = useLoading();

  useLayoutEffect(() => {
    function setLoading() {
      if (isPending) {
        dispatch({ type: IS_LOADING });
      } else {
        dispatch({ type: IS_SETTLED });
      }
    }
    setLoading();
  }, [isPending]);
}

export default useSetLoading;
