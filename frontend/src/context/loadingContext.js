import React, { createContext } from "react";
import useLoadingski from "../hooks/useLoading";
import Loading from "../components/shared/SVGs/Loading";

const LoadingContext = createContext();

function LoadingProvider({ children }) {
  const { state, dispatch } = useLoadingski();

  const { isLoading } = state;

  console.log(state);

  return (
    <LoadingContext.Provider
      value={{ state, dispatch }}
      state={state}
      dispatch={dispatch}
    >
      {isLoading && <Loading />}
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
