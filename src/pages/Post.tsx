import { useState } from "react";
import PostTitle from "../components/post/PostTitle";
import PostHashTag from "../components/post/PostHashTag";
import PostBtn from "../components/post/PostBtn";
import CourseDesc from "../components/course/CourseDesc";
import PostMap from "../components/post/PostMap";

// 파이어베이스에 즉시 저장할 데이터 : 카테고리, 제목, 해시태그
// 세션스토리지를 거친 후 파이어베이스에 저장할 데이터 : 장소, 장소별 설명(id, 설명)

// 장소 데이터
// 1. 세션 스토리지로 관리하는 빈 배열 initialPlace 생성
// 2. 검색 결과에서 장소 선택시 initialPlace에 push(장소명, 주소, 도로명 주소, 전화번호, 좌표, id)
// 3. 게시글 작성시 initialPlace를 파이어베이스에 저장 후 세션 스토리지 초기화

// 설명 데이터
// 1. 세션 스토리지로 관리하는 빈 배열 initialDesc 생성
// 2. 검색 결과에서 장소 선택 후 initialDesc에 해당 장소에 대한 설명 push(id, 설명)
// 3. 게시글 작성시 initialDesc를 파이어베이스에 저장 후 세션 스토리지 초기화

// 게시글 데이터 DB : uuid, createdAt, 카테고리, 제목, 해시태그, initialPlace

const Post = () => {
  return (
    <div className="w-[70%] h-auto mx-auto mt-10 xs:w-11/12 xs:mt-0">
      <PostTitle />
      <PostMap />
      <div className="flex mt-5 mb-10">
        <div className="w-1/2 h-96 border border-black mr-4 flex justify-center items-center xs:hidden">
          사진(CourseDesc로 이동 예정)
        </div>
        <div className="flex flex-col w-1/2 xs:w-full">
          <CourseDesc />
          <textarea
            placeholder="여행지를 소개해주세요."
            className="h-60 justify-end border border-black p-3 xs:h-40"
          />
          <button className="bg-gray-200 border border-black px-2 mt-3 float-right">
            등록
          </button>
        </div>
      </div>
      <PostHashTag />
      <PostBtn />
    </div>
  );
};

export default Post;
