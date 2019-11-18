import React, { useState, createContext } from "react";
import { useAsync } from "react-async";
import axios from "axios";
import * as authClient from "../utils/authClient";

const AuthContext = createContext();

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
  const [firstAttemptFinished, setFirstAttemptFinished] = useState(false);
  const {
    data = { user: null },
    error,
    isRejected,
    isPending,
    isSettled,
    reload,
    setData
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
      return null;
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
  const activatePlan = planId => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const { user } = data;
    setData({
      user: {
        ...user,
        activeWOPlan: {
          woPlan: planId,
          startDate: new Date(),
          endDate: tomorrow
        }
      }
    });
  };
  const deactivatePlan = () => {
    let yestarday = new Date();
    yestarday.setDate(yestarday.getDate() - 1);
    const { user } = data;
    setData({
      user: {
        ...user,
        activeWOPlan: {
          ...user.activeWOPlan,
          endDate: yestarday
        }
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{ data, login, register, activatePlan, deactivatePlan }}
      {...props}
    />
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
