import React, { useState } from "react";
import { useGetCommentQuery } from "../../redux/modules/apiSlice";
import Comment from "./Comment";
import Pagenation from "./Pagenation";

export interface CommentProps {
  paramId: string | undefined;
}

const CommentDesc = ({ paramId }: CommentProps) => {
  const [desc, setDesc] = useState(true);
  const { data, isLoading, isError, error } = useGetCommentQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const filterData = data?.filter((comment) => comment.postId === paramId);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filterData
    ? filterData.slice(firstPostIndex, lastPostIndex)
    : null;
  const currentAscPosts = filterData
    ? filterData.slice(firstPostIndex, lastPostIndex).reverse()
    : null;
  const totalContents: any = filterData?.length;
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalContents / postsPerPage); i++) {
    pages.push(i);
  }
  if (isError) {
    console.log(error);
  }
  return (
    <div>
      <div className="mb-10">
        <div>
          <input
            id="desc"
            type="button"
            onClick={() => {
              setDesc(true);
            }}
            value="최신순"
            style={
              desc === true
                ? { fontWeight: 600, textDecoration: "underline" }
                : undefined
            }
            className="mr-2 mb-4"
          />
          <input
            id="asc"
            type="button"
            onClick={() => {
              setDesc(false);
            }}
            value="오래된 순"
            style={
              desc === false
                ? { fontWeight: 600, textDecoration: "underline" }
                : undefined
            }
          />
        </div>
      </div>
      <h2 className="text-xl font-bold">댓글({filterData?.length})</h2>
      {isLoading ? (
        <h3 className="text-xl">댓글을 불러오고 있습니다 :-) </h3>
      ) : null}
      {desc === true
        ? currentPosts?.map((comment, index) => {
            return <Comment key={comment.id} comment={comment} index={index} />;
          })
        : currentAscPosts?.map((comment, index) => {
            return <Comment key={comment.id} comment={comment} index={index} />;
          })}
      <Pagenation
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pages={pages}
      />
    </div>
  );
};

export default CommentDesc;
