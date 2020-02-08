import React, { useContext, createContext } from "react";
import * as authClient from "../utils/authClient";
import useUser from "../hooks/useUser";

const AuthContext = createContext();

function AuthProvider(props) {
  const { state, dispatch, updateUser } = useUser();
  const { error, isPending, isRejected } = state;

  if (isPending) {
    return null;
  }
  if (isRejected) {
    if (error.status !== 403) {
      return (
        <div>
          <p className="black text-center">
            Can't connect to the server, try refreshing the page.
          </p>
        </div>
      );
    }
  }

  const login = values => authClient.login(values).then(() => updateUser());
  const logout = values =>
    authClient
      .logout(values)
      .then(() => updateUser())
      .catch(() => updateUser());
  const register = values =>
    authClient.register(values).then(() => updateUser());

  return (
    <AuthContext.Provider
      value={{ state, dispatch, login, logout, register, updateUser }}
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
