import { useRef, useState, useEffect } from "react";

function useSkip() {
  const [skip, setSkip] = useState(0);
  const lastOffsetHeight = useRef(0);
  useEffect(() => {
    function handleScroll(e) {
      const { offsetHeight } = document.body;
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        offsetHeight !== lastOffsetHeight.current
      ) {
        lastOffsetHeight.current = offsetHeight;
        setSkip(s => (s += 40));
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { skip, setSkip };
}

export default useSkip;
