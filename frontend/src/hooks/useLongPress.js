import { useState, useEffect, useCallback } from "react";

function useLongPress(callback = () => {}, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(() => callback(startLongPress), ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [startLongPress]);

  console.log(startLongPress);
  const start = useCallback(e => {
    e.persist();
    setStartLongPress(e);
  }, []);
  const stop = useCallback(e => {
    setStartLongPress(false);
  }, []);

  return {
    onTouchEnd: stop,
    onTouchMove: stop,
    onTouchStart: start
  };
}

export default useLongPress;
