import React, { useEffect, createContext } from "react";
import useLoadingski from "../hooks/useLoading";

const LoadingContext = createContext();

function LoadingProvider({ children }) {
  const { state, dispatch } = useLoadingski();

  const { isLoading } = state;

  useEffect(() => {
    const loader = document.getElementById("loader");
    const showLoader = () => loader.classList.remove("loader--hide");
    const hideLoader = () => loader.classList.add("loader--hide");
    if (isLoading) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [isLoading]);

  return (
    <LoadingContext.Provider
      value={{ state, dispatch }}
      state={state}
      dispatch={dispatch}
    >
      {children}
    </LoadingContext.Provider>
  );
}

function useLoading() {
  const context = React.useContext(LoadingContext);

  if (context === undefined) {
    throw new Error(`useLoading must be used within a LoadingProvider`);
  }
  return context;
}

export { LoadingProvider, useLoading };
