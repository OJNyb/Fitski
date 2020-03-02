import React from "react";
import { getErrorMessage } from "../../utils/errorHandling";
import useSetLoading from "../../hooks/useSetLoading";

const ErrorText = ({ error }) => {
  useSetLoading(false);
  const errorMessages = getErrorMessage(error);
  return <p className="text-center">{errorMessages[0].message}</p>;
};

export default ErrorText;
