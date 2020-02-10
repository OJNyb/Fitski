import { useState, useEffect, useCallback } from "react";

function useLongPress(
  holdCallback = () => {},
  clickCallback = () => {},
  ms = 300
) {
  const [startLongPress, setStartLongPress] = useState(false);
  const [cancelled, setCancelled] = useState(true);
  const [type, setType] = useState("short");

  const onTouchski = useCallback(() => {
    holdCallback();
    setType("short");
    setCancelled(true);
  }, [holdCallback]);

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
      }
      setCancelled(true);
      setType("short");
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [
    ms,
    type,
    holdCallback,
    clickCallback,
    startLongPress,
    cancelled,
    onTouchski
  ]);
  // TODO

  const start = useCallback(() => {
    setStartLongPress(true);
    setCancelled(false);
  }, []);
  const stop = useCallback(e => {
    e.preventDefault();
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
