import React, { useState, useContext, createContext } from "react";
const ErrorContext = createContext();

function ErrorProvider(props) {
  const [error, setError] = useState({ el: null });

  function setErr(err) {
    if (err.id !== error.id) {
      setError(err);
    }
  }

  function onClose() {
    if (error.onClose) {
      error.onClose();
    }
    setError({ el: null });
  }

  return (
    <ErrorContext.Provider value={{ setError: setErr }} {...props}>
      <>
        {error.el && (
          <div className="main-error-popup-container">
            <div className="main-error-popup-box shadow-medium">
              <div className="main-error-popup-text flex-ai-center">
                {error.el}
              </div>
              <button
                className="main-error-popup-close-btn theme-btn-no-border"
                onClick={onClose}
              >
                &times;
              </button>
            </div>
          </div>
        )}
        {props.children}
      </>
    </ErrorContext.Provider>
  );
}

function useError() {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a ErrorProvider`);
  }
  return context;
}

export { ErrorProvider, useError };
