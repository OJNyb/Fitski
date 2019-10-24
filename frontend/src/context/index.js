import React from "react";
import { AuthProvider } from "./authContext";
import { UserProvider } from "./userContext";
import { LoadingProvider } from "./loadingContext";

function AppProviders({ children }) {
  return (
    <LoadingProvider>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default AppProviders;
