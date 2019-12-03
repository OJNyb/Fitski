import { useState, useEffect, useCallback } from "react";

function useLongPress(
  holdCallback = () => {},
  clickCallback = () => {},
  ms = 300
) {
  const [startLongPress, setStartLongPress] = useState(false);
  const [cancelled, setCancelled] = useState(true);
  const [type, setType] = useState("short");

  function onTouchski() {
    setType("long");
  }

  useEffect(() => {
    let timerId;
    if (cancelled) {
      clearTimeout(timerId);
    } else if (startLongPress) {
      timerId = setTimeout(onTouchski, ms);
    } else {
      clearTimeout(timerId);
      if (type === "short") {
        clickCallback();
      } else {
        holdCallback();
      }
      setType("short");
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [ms, type, holdCallback, clickCallback, startLongPress, cancelled]);

  const start = useCallback(() => {
    setStartLongPress(true);
    setCancelled(false);
  }, []);
  const stop = useCallback(() => {
    setStartLongPress(false);
  }, []);
  const cancel = useCallback(() => {
    setStartLongPress(false);
    setCancelled(true);
  }, []);

  return {
    onTouchEnd: stop,
    onTouchMove: cancel,
    onTouchStart: start
  };
}

export default useLongPress;
