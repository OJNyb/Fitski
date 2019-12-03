import React from "react";
import Plus20 from "../../shared/SVGs/Plus20";

const NoWeeks = ({ isSelf, setShowModal }) => {
  return (
    <div className="flex-col-cen fixed width-100p plan-mobile-empty-plan-container">
      <span className="color-gray">Workout Plan Empty</span>
      {isSelf && (
        <div className="flex-col-cen">
          <button onClick={() => setShowModal("addWeeks")}>
            <Plus20 fill={"#a60000"} />
          </button>
          <span className="color-light-gray font-14 margin-5">
            Start Adding Weeks
          </span>
        </div>
      )}
    </div>
  );
};

export default NoWeeks;
