import React, { useContext, createContext } from "react";
import * as authClient from "../utils/authClient";
import useUser from "../hooks/useUser";

const AuthContext = createContext();

function AuthProvider(props) {
  const { state, dispatch, reload, setReload } = useUser();
  const { error, isPending, isRejected } = state;

  if (isPending) {
    return null;
  }
  if (isRejected) {
    if (error.status !== 403) {
      return (
        <div style={{ color: "red" }}>
          <p>Uh oh... There's a problem. Try refreshing the app.</p>
        </div>
      );
    }
  }

  const login = values =>
    authClient.login(values).then(() => setReload(reload + 1));
  const logout = values => authClient.logout(values);
  const register = values =>
    authClient.register(values).then(() => setReload(reload + 1));

  return (
    <AuthContext.Provider
      value={{ state, dispatch, login, logout, register }}
      {...props}
    />
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
