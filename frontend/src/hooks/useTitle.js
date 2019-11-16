import { useLayoutEffect } from "react";

const useTitle = title => {
  useLayoutEffect(() => {
    function setTitle() {
      document.title = title;
    }
    setTitle();
  }, [title]);
};

export default useTitle;
