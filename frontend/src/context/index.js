import React from "react";
import { AuthProvider } from "./authContext";
import { UserProvider } from "./userContext";
import { LoadingProvider } from "./loadingContext";
import { ViewProvider } from "./viewContext";
import { ErrorProvider } from "./errorContext";

function AppProviders({ children }) {
  return (
    <LoadingProvider>
      <AuthProvider>
        <ViewProvider>
          <ErrorProvider>
            <UserProvider>{children}</UserProvider>
          </ErrorProvider>
        </ViewProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default AppProviders;
