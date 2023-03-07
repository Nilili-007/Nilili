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

    window.addEventListener("beforeunload", preventClose);
    dispatch(replaceAllData([]));

    return () => {
      window.addEventListener("beforeunload", preventClose);
      dispatch(replaceAllData([]));
    };
  }, []);
};

export default usePreventLeave;
