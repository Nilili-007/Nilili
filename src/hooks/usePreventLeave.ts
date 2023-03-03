import { useEffect } from "react";

const usePreventLeave = () => {
  useEffect(() => {
    const preventClose = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", preventClose);

    return () => {
      window.addEventListener("beforeunload", preventClose);
    };
  }, []);
};

export default usePreventLeave;
