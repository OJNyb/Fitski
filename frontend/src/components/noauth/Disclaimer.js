import React from "react";
import { Link } from "react-router-dom";

const Disclaimer = () => {
  return (
    <p className="color-light-gray font-w-300 font-14 text-center">
      By clicking Create Account, you agree to our{" "}
      <Link to="terms">Terms and Conditions</Link> and{" "}
      <Link to="privacy-policy">Data Policy</Link>
    </p>
  );
};

export default Disclaimer;
