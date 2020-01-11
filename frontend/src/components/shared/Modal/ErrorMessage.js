import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex-center mb-5 modal-error-message-container">
      <i className="material-icons color-error mr-4">error_outline</i>
      <span className="black font-w-300">{message}</span>
    </div>
  );
};

export default ErrorMessage;
