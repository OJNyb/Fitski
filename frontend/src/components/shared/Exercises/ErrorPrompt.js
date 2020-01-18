import React from "react";

const ErrorPrompt = ({ data, onClick, onClose }) => {
  const { type, exercises } = data;

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
  return (
    <div className="error-prompt-container flex-center-space-bw">
      <div className="flex-ai-center">
        <span>{text}.</span>
        <button className="tc" onClick={onClick}>
          Try again
        </button>
      </div>
      <button onClick={onClose} className="error-prompt-close-btn">
        <i className="material-icons">close</i>
      </button>
    </div>
  );
};

export default ErrorPrompt;
