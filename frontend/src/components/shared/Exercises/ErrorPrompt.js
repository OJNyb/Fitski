import React from "react";
import { useError } from "../../../context/errorContext";

const ErrorPrompt = ({ data, onClick, onClose }) => {
  const { type, exercises } = data;
  const { setError } = useError();

  let text;
  if (type === "add") {
    text = `Failed to add ${exercises[0].name}`;
  } else if (type === "edit") {
    text = `Failed to edit ${exercises[0].name}`;
  } else {
    text = `Failed to delete ${exercises.length} exercise${
      exercises.length === 1 ? "" : "s"
    }`;
  }

  setError({
    el: (
      <>
        <span>{text}.</span>
        <button className="tc" onClick={onClick}>
          Try again
        </button>
      </>
    ),
    id: text,
    onClose
  });

  return null;
};

export default ErrorPrompt;
