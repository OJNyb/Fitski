import React, { useState, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const SubNav = ({ weeks, weekIndex, currentDayIndex, setCurrentDayIndex }) => {
  const [showWeek, setShowWeek] = useState(false);

  const { search } = useLocation();

  useLayoutEffect(() => {
    let regex = RegExp("showweek=true", "i");
    if (regex.test(search)) {
      setShowWeek(true);
    }
  }, [weekIndex]);

  let leftArrowAction;
  let rightArrowAction;
  let centerText;
  if (showWeek) {
    if (weeks[weekIndex - 1]) {
      leftArrowAction = `${weeks[weekIndex - 1]._id}`;
    }
    if (weeks[weekIndex + 1]) {
      rightArrowAction = `${weeks[weekIndex + 1]._id}`;
    }
    centerText = `Week ${weekIndex + 1}`;
  } else {
    if (currentDayIndex > 0) {
      leftArrowAction = () => setCurrentDayIndex(currentDayIndex - 1);
    }

    if (currentDayIndex < 6) {
      rightArrowAction = () => setCurrentDayIndex(currentDayIndex + 1);
    }
    centerText = `Day ${currentDayIndex + 1}`;
  }

  return (
    <div
      className={
        "width-100p flex-center-space-bw color-white padding-0 border-box height-50 fixed edit-week-sub-nav-container " +
        (showWeek ? "bc-8c1" : "bc-d9")
      }
      onClick={() => setShowWeek(!showWeek)}
    >
      <Button action={leftArrowAction} left={true} link={showWeek} />
      <span className="font-15">{centerText}</span>
      <Button action={rightArrowAction} link={showWeek} />
    </div>
  );
};

const Button = ({ left, link, action }) => {
  let innerEl = (
    <i
      className={
        "material-icons-round font-16 " + (left ? " reversed-icon" : "")
      }
    >
      arrow_forward_ios
    </i>
  );

  if (!action) {
    return <div className="edit-week-sub-nav-btn-filler"></div>;
  }

  if (link) {
    return (
      <Link
        className="white-material-btn edit-week-sub-nav-btn flex-center"
        to={`${action}?showweek=true`}
      >
        {innerEl}
      </Link>
    );
  }
  return (
    <button
      className="white-material-btn edit-week-sub-nav-btn"
      onClick={e => {
        action();
        e.stopPropagation();
      }}
    >
      {innerEl}
    </button>
  );
};

export default SubNav;
