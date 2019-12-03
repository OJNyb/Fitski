import React from "react";
import { AuthProvider } from "./authContext";
import { UserProvider } from "./userContext";
import { LoadingProvider } from "./loadingContext";
import { ViewProvider } from "./viewContext";

function AppProviders({ children }) {
  return (
    <LoadingProvider>
      <AuthProvider>
        <ViewProvider>
          <UserProvider>{children}</UserProvider>
        </ViewProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default AppProviders;
