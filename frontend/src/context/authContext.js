import React from "react";
import { useAsync } from "react-async";
import axios from "axios";
import * as authClient from "../utils/authClient";
// import { bootstrapAppData } from "../utils/bootstrap";
// import * as authClient from "../utils/auth-client";
// import {FullPageSpinner} from '../components/lib'

const AuthContext = React.createContext();

function getUser() {
  return axios
    .get("/user/me")
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

async function bootstrapAppData() {
  const data = await getUser();
  if (!data) {
    return { user: null };
  }
  const user = data;
  return {
    user
  };
}

function AuthProvider(props) {
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
  const {
    data = { user: null },
    error,
    isRejected,
    isPending,
    isSettled,
    reload
  } = useAsync({
    promiseFn: bootstrapAppData
  });

  React.useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true);
    }
  }, [isSettled]);

  if (!firstAttemptFinished) {
    if (isPending) {
      return <p>Loading...</p>;
    }
    if (isRejected) {
      return (
        <div style={{ color: "red" }}>
          <p>Uh oh... There's a problem. Try refreshing the app.</p>
          <pre>{error.message}</pre>
        </div>
      );
    }
  }

  const login = values => authClient.login(values).then(reload);
  const register = values => authClient.register(values).then(reload);

  return <AuthContext.Provider value={{ data, login, register }} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
