import React, { useState } from "react";

import Register from "./Register";
import Login from "./Login";

import "./noauth.css";

// Switch out background with some wavy shit?
// When showSignX tab click old stuff reappears

const Landing = () => {
  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [showSignX, setShowSignX] = useState(false);

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
            {/* {signUp && (
              <div className="landing-log-in-existing-btn-container">
                <button>Log into existing account</button>
              </div>
            )} */}

            <div className="landing-img-text-container">
              <div className="landing-img-text-item">
                <i className="material-icons">insert_chart_outlined</i>
                <span>Create a workout plan</span>
              </div>
              <div className="landing-img-text-item">
                <i className="material-icons">search</i>
                <span>Find a workout plan</span>
              </div>
              <div className="landing-img-text-item">
                <i className="material-icons-outlined">headset_mic</i>
                <span>Track what you lift</span>
              </div>
            </div>
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
              <i className="material-icons">fitness_center</i>

              <h1>Get with the program, bitch</h1>

              <h2>Join Fitnal today</h2>
              <div>
                <button className="theme-btn-filled" onClick={showRegister}>
                  Sign up
                </button>
              </div>
              <div>
                <button className="theme-btn" onClick={showLogin}>
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

export default Landing;
