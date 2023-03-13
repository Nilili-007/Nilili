import { useState } from "react";
import { useGetCommentQuery } from "../../redux/modules/apiSlice";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { BiComment } from "react-icons/bi";
import LikeBtn from "./LikeBtn";
import Share from "./Share";
import { CommentType } from "./CommentInput";
import usePagenation from "../../hooks/usePagenation";
import { Pagenation } from "../shared";

export interface CommentProps {
  paramId: string | undefined;
  courseData?: CourseType;
}

const CommentDesc = ({ paramId, courseData }: CommentProps) => {
  const [desc, setDesc] = useState(true);
  const { data, isError } = useGetCommentQuery();

  const filterData = data?.filter(
    (comment: CommentType) => comment.postId === paramId
  );

  const {
    firstPostIndex,
    lastPostIndex,
    pages,
    currentPage,
    setCurrentPage,
    pageArr,
    setPageArr,
    lastPage,
    firstPage,
    showPages,
    currentPages,
    positionY,
  } = usePagenation(filterData, 10, 5, 2300);

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
    return <>Error : 데이터를 불러오지 못했습니다.</>;
  }
  return (
    <div className="mb-40">
      <div className="justify-between items-start md:items-center flex">
        <div className="flex-col md:flex-row flex gap-0 md:gap-8 ">
          <LikeBtn paramId={paramId} course={courseData} />
          <h2 className="text-[20px] sm:text-[20px] flex items-center gap-3 font-medium">
            <BiComment size={28} className="sm:scale-125" />
            {commentLength} 개
          </h2>
        </div>
        <Share />
      </div>
      <CommentInput paramId={paramId} />
      {filterData?.length === 0 ? (
        <div className="flex justify-center">
          {" "}
          아직은 작성된 댓글이 없어요 :-({" "}
        </div>
      ) : (
        <div className="xs:mb-8 mb-10 flex">
          <div className="text-[16px] sm:text-[20px] font-semibold flex gap-2">
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
      )}

      {desc === true
        ? currentPosts?.map((comment, index) => {
            return <Comment key={comment.id} comment={comment} index={index} />;
          })
        : currentAscPosts?.map((comment, index) => {
            return <Comment key={comment.id} comment={comment} index={index} />;
          })}
      {filterData?.length === 0 ? null : (
        <Pagenation
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pages={pages}
          pageArr={pageArr}
          setPageArr={setPageArr}
          lastPage={lastPage}
          firstPage={firstPage}
          showPages={showPages}
          currentPages={currentPages}
          positionY={positionY}
        />
      )}
    </div>
  );
};

export default CommentDesc;
