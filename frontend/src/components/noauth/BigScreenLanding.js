import React, { useState } from "react";

import Register from "./Register";
import Login from "./Login";
import LandingImageText from "./LandingImageText";
import useSetLoading from "../../hooks/useSetLoading";

const BigScreenLanding = () => {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [showSignX, setShowSignX] = useState(false);

  useSetLoading(false);

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
              <form className="landing-login-form">
                <div className="landing-login-input-container">
                  <input
                    className="landing-input landing-login-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="landing-login-input-container">
                  <input
                    className="landing-input landing-login-input"
                    type="password"
                    name="password"
                    placeholder="Password"
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
              <h2>Join Fitnut today</h2>
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
