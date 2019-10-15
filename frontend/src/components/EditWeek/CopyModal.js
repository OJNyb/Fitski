import React, { useState } from "react";
import Modal from "../shared/Modal/Modal";
import { withRouter } from "react-router-dom";

const CopyModal = ({
  weeks,
  handleSubmit,
  hideModal,
  match: {
    params: { plan_id: planId, week_id: weekId }
  }
}) => {
  const [selected, setSelected] = useState(false);

  function handleSelect(weekId) {
    setSelected(weekId);
  }

  function handleCopySubmit() {
    if (!selected) return alert("No week selected");

    handleSubmit("post", { copyWeekId: selected });
  }

  let repeats = 1;

  let weeksDisplay = weeks.map((x, y) => {
    const { repeat } = x;
    let weekNumber = y + repeats;
    if (repeat) {
      weekNumber += ` - ${weekNumber + repeat}`;
      repeats += repeat;
    }
    if (x._id === weekId) return;
    return (
      <Week
        key={x._id}
        week={x}
        onSelect={handleSelect}
        weekNumber={weekNumber}
        selected={selected}
      />
    );
  });
  let children = (
    <div className="copy-week-weeks-container">
      {weeksDisplay}
      <button
        className="theme-btn copy-week-confirm-btn"
        onClick={handleCopySubmit}
      >
        Confirm
      </button>
    </div>
  );

  return (
    <Modal header={"Copy week"} children={children} toggleModal={hideModal} />
  );
};

const Week = ({ week, weekNumber, onSelect, selected }) => {
  // const [expand, setExpand] = useState(false);

  const { _id: weekId } = week;

  let classki = "copy-week-item";

  if (week._id === selected) {
    classki += " copy-week-item-active";
  }

  return (
    <div className={classki} onClick={() => onSelect(weekId)}>
      Week {weekNumber}
      {/* <button onClick={() => setExpand(!expand)}>
        <i className="material-icons copy-week-expand">keyboard_arrow_down</i>
      </button>
      {expand && (
        <div>
          <p>Bench press 3x3</p>
          <p>Bench press 3x3</p>
          <p>Bench press 3x3</p>
        </div>
      )} */}
    </div>
  );
};

export default withRouter(CopyModal);
