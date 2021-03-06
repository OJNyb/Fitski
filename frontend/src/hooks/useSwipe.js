import { useState } from "react";

const useSwipe = (onLeft, onRight) => {
  const [x, setX] = useState(0);
  const [transition, setTransition] = useState(false);
  const [initialX, setInitialX] = useState(0);

  function onTouchStart(e) {
    setInitialX(e.touches[0].screenX);
    setX(0);
  }
  function onTouchEnd(e) {
    const { innerWidth } = e.view;

    if (x / innerWidth > 0.5) {
      setX(innerWidth);
      onRight();
    } else if (x / innerWidth < -0.5) {
      setX(-innerWidth);
      onLeft();
    } else {
      setX(0);
    }
    setTransition(true);

    setTimeout(() => {
      setX(0);
      setTransition(false);
    }, 250);
  }

  function onTouchMove(e) {
    let x = initialX - e.touches[0].screenX;
    if (x > 50) setX(x - 50);
    else if (x < -50) {
      setX(x + 50);
    }
  }

  return { x, setX, onTouchStart, onTouchMove, onTouchEnd, transition };
};

export default useSwipe;
