import React, { useRef, useState } from "react";
import { debounce } from "lodash";

const useInput = (initialValue: string) => {
  const inputRef = useRef<any>();
  const [value, setValue] = useState(initialValue);
  const trimValue = value.trim();

  const changeValueHandler = debounce(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value);
    },
    500
  );
  return {
    inputRef,
    value,
    trimValue,
    changeValueHandler,
  };
};

export default useInput;
