import React from "react";
import { Link } from "react-router-dom";
import LandingImageText from "./LandingImageText";
import useSetLoading from "../../hooks/useSetLoading";

const MobileLanding = ({}) => {
  useSetLoading(false);

  return (
    <>
      <div className="padding-15 mobile-landing-container margin-a">
        <div className="flex-col">
          <div className="landing-signup-container">
            <i className="material-icons landing-icon-medium">fitness_center</i>
            <h1>Get with the program, bitch</h1>
            <h2>Join Fitnut today.</h2>
            <Link
              to="/register"
              className="theme-btn-filled landing-upper-button flex-center"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="theme-btn landing-upper-button flex-center"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>

      <div className="padding-15 landing-icon-conatiner-small flex-center">
        <i className="material-icons landing-icon-small">fitness_center</i>
        <div className="padding-15-0">
          <LandingImageText />
        </div>
      </div>

      <div className="mobile-sign-x-button-down-container flex-ai-center">
        <Link
          to="/register"
          className="theme-btn-filled m-r-10 flex-1-50p mobile-sign-x-link-down flex-center"
        >
          Sign up
        </Link>
        <Link
          to="/login"
          className="theme-btn m-l-10 flex-1-50p mobile-sign-x-link-down flex-center"
        >
          Log in
        </Link>
      </div>
    </>
  );
};

export default MobileLanding;
