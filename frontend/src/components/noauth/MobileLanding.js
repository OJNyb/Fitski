import React from "react";

const MobileLanding = ({}) => {
  return (
    <div className="padding-15 mobile-landing-container">
      <div className="flex-col">
        <div className="landing-signup-container">
          <i className="material-icons">fitness_center</i>

          <h1>Get with the program, bitch</h1>

          <h2>Join Fitnut today.</h2>
          <div>
            <button className="theme-btn-filled">Sign up</button>
          </div>
          <div>
            <button className="theme-btn">Log in</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileLanding;
