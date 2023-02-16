import React from "react";
import { useGetCommentDescQuery } from "../../redux/modules/apiSlice";
import Comment from "./Comment";

const CommentDesc = () => {
  const { data } = useGetCommentDescQuery();
  return (
    <div>
      {data?.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

export default CommentDesc;
