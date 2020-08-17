import React from "react";

const LandingImageText = () => {
  return (
    <div className="color-white">
      <TextItem icon={"search"} text={"Get with a program"} />
      <TextItem icon={"show_chart"} text={"Keep tabs on your gains"} />
      <TextItem icon={"fitness_center"} text={"Achieve your fitness goals"} />
    </div>
  );
};

const TextItem = ({ icon, text }) => {
  return (
    <div className="landing-img-text-item flex-ai-center">
      <i className="material-icons">{icon}</i>
      <b className="font-18">{text}</b>
    </div>
  );
};

export default LandingImageText;
