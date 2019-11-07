import React from "react";
import useSetLoading from "../hooks/useSetLoading";

const NoMatch = () => {
  useSetLoading(false);

  return <div>Page does not exist</div>;
};

export default NoMatch;
