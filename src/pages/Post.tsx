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

import { useState } from "react";
import {
  PostBtn,
  PostHashTag,
  PostTitle,
  PostMap,
} from "../components/post/index";

import { useNavigate } from "react-router-dom";
import { useAddCourseMutation } from "../redux/modules/apiSlice";
interface IinitialList {
  name: string;
}

//select option의 타입
export interface optionType {
  value: string;
  label: string;
}

const Post = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [targetPlace, setTargetPlace] = useState("");
  const [addCourse] = useAddCourseMutation();

  //카테고리 선택
  const [category, setCategory] = useState("");
  const [courseTitle, setCourseTitle] = useState("");

  //해시태그 선택
  const [selectedTags, setSelectedTags] = useState<optionType[] | null>([]);

  //Hashtag 테스트용 submit handler
  const submitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //selectedTags는 오브젝트 배열입니다.
    //hashtag는 데이터베이스에 문자열 배열로 들어가야 하기 때문에, value 값만 추출하여 문자열배열로 바꿉니다.
    let selectedValues = selectedTags?.map((tag) => tag.value);
    const newPost = {
      category,
      selectedValues,
      courseTitle,
    };
    addCourse(newPost);
    navigate("/course");
  };

  // 게시글 데이터 DB : uuid, createdAt, 카테고리, 제목, 해시태그, initialPlac

  return (
    // 테스트목적으로 div를 form으로 변경했습니다.
    <form onSubmit={submitHandle}>
      <div className="w-[70%] h-auto mx-auto mt-10 xs:w-11/12 xs:mt-0">
        <PostTitle
          category={category}
          setCategory={setCategory}
          courseTitle={courseTitle}
          setCourseTitle={setCourseTitle}
        />
        <PostMap />
        <PostHashTag
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <PostBtn />
      </div>
    </form>
  );
};

export default Post;
