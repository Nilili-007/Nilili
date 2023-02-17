import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourse,
  deleteMemo,
  downCourse,
  upCourse,
} from "../../redux/modules/temporarySlice";
import { TiMinus } from "react-icons/ti";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import PostCourseDesc from "./PostCourseDesc";
import PostTextarea from "./PostTextarea";

interface PostProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const PostCourseInfo = ({ modalOpen, setModalOpen }: PostProps) => {
  const dispatch = useDispatch();

  const courseList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );

  const [lists, setLists] = useState(courseList);

  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  const onClickDeleteCourse = (item: any) => {
    // 모달로 변경
    if (window.confirm("일정에서 삭제하시겠습니까?")) {
      dispatch(deleteCourse(item.id));
      dispatch(deleteMemo(item.id));
    }
  };

  const onClickUpCourse = (item: any) => {
    dispatch(upCourse(item));
  };
  const onClickDownCourse = (item: any) => {
    dispatch(downCourse(item));
  };

  useEffect(() => {
    setLists(courseList);
  }, [courseList]);

  return (
    <div className="w-[35%] h-[1000px] pl-7 float-right">
      <div className="flex flex-col h-full overflow-y-scroll ">
        {lists?.map((item: any, key: any) => {
          return (
            <div key={key} className="border border-gray-400 mb-8">
              <div className="w-full px-2 py-3 flex">
                <div className="w-full">
                  <h4 className="pl-3 font-bold text-xl">
                    #{key + 1} {item.name}
                  </h4>
                  <PostCourseDesc item={item} />
                  <PostTextarea item={item} />
                </div>
                <TiMinus
                  onClick={() => onClickDeleteCourse(item)}
                  className="-mt-2 text-3xl text-gray-400 hover:text-black"
                />
              </div>
              <div className="flex text-3xl p-3 -mt-10">
                <AiOutlineUp
                  onClick={() => onClickUpCourse(item)}
                  className="hover:text-gray-400"
                />
                <AiOutlineDown
                  onClick={() => onClickDownCourse(item)}
                  className="hover:text-gray-400"
                />
              </div>
            </div>
          );
        })}
        <button onClick={showModal} className="bg-black text-white py-2">
          여행지 추가하기
        </button>
      </div>
    </div>
  );
};

export default PostCourseInfo;
