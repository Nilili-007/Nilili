import { useState } from "react";
import PostTitle from "../components/post/PostTitle";
import PostHashTag from "../components/post/PostHashTag";
import PostBtn from "../components/post/PostBtn";
import PostMap from "../components/post/PostMap";
import PostCourseDesc from "../components/post/PostCourseDesc";

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
      <div className="flex flex-col w-full xs:w-full">
        <PostCourseDesc />
      </div>
      <PostHashTag />
      <PostBtn />
    </div>
  );
};

export default Post;
