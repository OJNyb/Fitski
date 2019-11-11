import { useLayoutEffect } from "react";
import { useLoading } from "../context/loadingContext";

import { IS_LOADING, IS_SETTLED } from "../types/loadingTypes";

function useSetLoading(isPending) {
  const { dispatch } = useLoading();

  useLayoutEffect(() => {
    function setLoading() {
      if (isPending) {
        dispatch({ type: IS_LOADING });
      } else {
        dispatch({ type: IS_SETTLED });
      }
    }
    setLoading();
  }, [dispatch, isPending]);
}

export default useSetLoading;
