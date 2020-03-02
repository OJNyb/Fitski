import React, { useState, useContext, createContext } from "react";
const ErrorContext = createContext();

function ErrorProvider(props) {
  const [error, setError] = useState(null);

  return (
    <ErrorContext.Provider value={{ setError }} {...props}>
      <>
        {error && (
          <div className="main-error-popup-container">
            <div className="main-error-popup-box shadow-medium">
              <span>{error}</span>
              <button
                className="main-error-popup-close-btn theme-btn-no-border"
                onClick={() => setError(null)}
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
