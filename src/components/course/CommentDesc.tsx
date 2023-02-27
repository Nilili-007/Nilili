import React, { useState } from "react";
import { useGetCommentQuery } from "../../redux/modules/apiSlice";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import Pagenation from "./Pagenation";
import { BiComment } from "react-icons/bi";

export interface CommentProps {
  paramId: string | undefined;
}

const CommentDesc = ({ paramId }: CommentProps) => {
  const [desc, setDesc] = useState(true);
  const { data, isError, error } = useGetCommentQuery();
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
    <div className="mb-40">
      <h2 className="text-[32px] font-bold flex items-center gap-8 mb-10">
        <BiComment size={33} />
        {filterData?.length}
      </h2>
      <CommentInput paramId={paramId} />
      <div className="mb-10 flex">
        <div className="mb-4 text-[20px] font-semibold flex gap-2">
          <input
            id="desc"
            type="button"
            onClick={() => {
              setDesc(true);
            }}
            value="최신 순"
            style={
              desc === true
                ? { fontWeight: 700, textDecoration: "underline" }
                : undefined
            }
          />
          <span>/</span>
          <input
            id="asc"
            type="button"
            onClick={() => {
              setDesc(false);
            }}
            value="오래된 순"
            style={
              desc === false
                ? { fontWeight: 700, textDecoration: "underline" }
                : undefined
            }
          />
        </div>
      </div>
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
