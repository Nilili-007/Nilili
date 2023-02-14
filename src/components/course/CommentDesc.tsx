import React from "react";
import { useGetCommentDescQuery } from "../../redux/modules/apiSlice";
import Comment from "./Comment";

interface CommentDescProps {
  paramId: string | undefined;
}

const CommentDesc = ({ paramId }: CommentDescProps) => {
  const { data } = useGetCommentDescQuery();
  return (
    <div>
      {data
        ?.filter((comment) => comment.postId === paramId)
        .map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
    </div>
  );
};

export default CommentDesc;
