import React from "react";
import useSetLoading from "../hooks/useSetLoading";
import useNavDehaze from "../hooks/useNavDehaze";

const NoMatch = () => {
  useSetLoading(false);
  useNavDehaze();

  return <div>Page does not exist</div>;
};

export default NoMatch;
