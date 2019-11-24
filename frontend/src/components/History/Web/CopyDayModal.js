import React from "react";

import BigViewModal from "../../shared/Modal/BigViewModal";

const CopyDayModal = ({ setShowModal, historyDays, handleCopyDay }) => {
  const children = (
    <div>
      <DayPicker />
    </div>
  );

  return <BigViewModal header={"Copy day"} children={children} />;
};

export default CopyDayModal;
