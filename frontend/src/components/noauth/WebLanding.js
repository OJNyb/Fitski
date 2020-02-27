import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import LandingImageText from "./LandingImageText";
import useSetLoading from "../../hooks/useSetLoading";
import { useAuth } from "../../context/authContext";

import "./webLanding.css";

const BigScreenLanding = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [showSignX, setShowSignX] = useState(false);
  const { login: loginReq } = useAuth();
  const [redirect, setRedirect] = useState(false);
  useSetLoading(false);

  if (redirect) {
    return <Redirect to={"/login?err=true"} />;
  }

  function showLogin() {
    !showSignX && setShowSignX(true);
    setSignUp(false);
    setLogin(true);
  }

  function showRegister() {
    !showSignX && setShowSignX(true);
    setSignUp(true);
    setLogin(false);
  }

  function onLogin(e) {
    e.preventDefault();
    loginReq({ email, password }).catch(() => {
      setRedirect(true);
    });
  }
  return (
    <>
      <div className="landing-container">
        <div className="landing-icon-conatiner">
          <i className="material-icons landing-icon">fitness_center</i>
        </div>

        <div
          className={
            "landing-inner-container" + (showSignX ? " landing-left" : "")
          }
        >
          <div className="landing-wrapper sign-x-container">
            {signUp && (
              <>
                <Register />

                <div className="landing-log-in-existing-btn-container">
                  <button className="theme-btn" onClick={showLogin}>
                    Log into existing account
                  </button>
                </div>
              </>
            )}

            {login && (
              <>
                <Login />
                <div className="landing-log-in-existing-btn-container">
                  <button className="theme-btn" onClick={showRegister}>
                    Create an account
                  </button>
                </div>
              </>
            )}
          </div>

          <div
            className={
              "landing-image-container landing-wrapper landing-right-width" +
              (showSignX ? " landing-image-transition" : "")
            }
          >
            <LandingImageText />
          </div>

          <div className="landing-overview-container landing-wrapper landing-right-width">
            <div className="landing-login-container">
              <form className="landing-login-form" onSubmit={onLogin}>
                <div className="landing-login-input-container">
                  <input
                    className="landing-input landing-login-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="landing-login-input-container">
                  <input
                    className="landing-input landing-login-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                <button className="landing-login-button theme-btn">
                  Log in
                </button>
              </form>
            </div>
            <div className="landing-signup-container">
              <i className="material-icons landing-icon-medium">
                fitness_center
              </i>
              <h1>Get with the program, bitch</h1>
              <h2>Join Chadify today</h2>
              <div>
                <button
                  className="theme-btn-filled landing-upper-button"
                  onClick={showRegister}
                >
                  Sign up
                </button>
              </div>
              <div>
                <button
                  className="theme-btn landing-upper-button"
                  onClick={showLogin}
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BigScreenLanding;
