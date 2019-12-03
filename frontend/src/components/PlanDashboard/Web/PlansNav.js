import React from "react";
import NavMid from "../../shared/NavMid/NavMid";

const PlansNav = () => {
  return (
    <NavMid
      backText={"Plans"}
      rightLinkTo={"/create-plan"}
      rightLinkText={"Create plan"}
    />
  );
};

export default PlansNav;
