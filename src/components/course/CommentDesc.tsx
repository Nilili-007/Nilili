import React, { useState } from "react";
import { useGetCommentQuery } from "../../redux/modules/apiSlice";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import Pagenation from "./Pagenation";
import { BiComment } from "react-icons/bi";
import LikeBtn from "./LikeBtn";
import Share from "./Share";
import { CommentType } from "./CommentInput";
import usePagenation from "../../hooks/usePagenation";

export interface CommentProps {
  paramId: string | undefined;
  courseData?: CourseType;
}

const CommentDesc = ({ paramId, courseData }: CommentProps) => {
  const [desc, setDesc] = useState(true);
  const { data, isError, error } = useGetCommentQuery();

  const filterData = data?.filter(
    (comment: CommentType) => comment.postId === paramId
  );

  const { firstPostIndex, lastPostIndex, pages, currentPage, setCurrentPage } =
    usePagenation(filterData, 10);

  const currentPosts = filterData
    ? filterData.slice(firstPostIndex, lastPostIndex)
    : null;
  const currentAscPosts = filterData
    ? filterData.reverse().slice(firstPostIndex, lastPostIndex)
    : null;
  const commentLength = filterData?.length
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (isError) {
    console.log(error);
  }
  return (
    <div className="mb-40">
      <div className="justify-between items-center gap-8 sm:flex">
        <div className="flex justify-between mt-2">
          <LikeBtn paramId={paramId} course={courseData} />
          <h2 className="text-[20px] flex items-center gap-3 font-medium">
            <BiComment size={40} />
            {commentLength} 개
          </h2>
        </div>
        <Share />
      </div>
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
