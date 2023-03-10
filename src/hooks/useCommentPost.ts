import React, { useState } from "react";
import { CommentType } from "../components/course/CommentInput";
import { logEvent } from "../utils/amplitude";

const useCommentPost = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const trimValue = value.trim();
  const changeValueHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };
  const submitHandler = (
    event: React.FormEvent<HTMLFormElement>,
    addFn: (newContent: CommentType) => void,
    newContent: CommentType
  ) => {
    event.preventDefault();
    addFn(newContent);
    setValue("");
    logEvent("댓글등록", { from: "상세페이지" });
  };
  return {
    trimValue,
    changeValueHandler,
    submitHandler,
    value,
  };
};

export default useCommentPost;
