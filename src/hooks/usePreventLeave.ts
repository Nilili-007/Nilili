import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { replaceAllData } from "../redux/modules/courseSlice";

const usePreventLeave = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const preventClose = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    if (
      window.location.pathname === "/post" ||
      window.location.pathname === `/edit/${window.location.pathname.slice(6)}`
    ) {
      window.addEventListener("beforeunload", preventClose);
      dispatch(replaceAllData([]));
    }

    return () => {
      if (
        window.location.pathname === "/post" ||
        window.location.pathname ===
          `/edit/${window.location.pathname.slice(6)}`
      ) {
        window.addEventListener("beforeunload", preventClose);
        dispatch(replaceAllData([]));
      }
    };
  }, []);
};

export default usePreventLeave;
