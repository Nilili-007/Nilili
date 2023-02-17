// 파이어베이스에 즉시 저장할 데이터 : 카테고리, 제목, 해시태그
// 세션스토리지를 거친 후 파이어베이스에 저장할 데이터 : 장소, 장소별 설명(id, 설명)

import { useState } from "react";
import {
  PostHashTag,
  PostTitle,
  PostMap,
  PostHeader,
  PostTravelStatus,
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

  //지역 선택
  const [category, setCategory] = useState("");
  const [courseTitle, setCourseTitle] = useState("");

  // 여행전/후 선택
  const [travelStats, setTravelStatus] = useState<boolean | null>(false);

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

  // 게시글 데이터 DB : uuid, createdAt, 카테고리, 제목, 해시태그, initialPlace

  return (
    // <form onSubmit={submitHandle}>
    <div className="h-[100vh]">
      <PostHeader />
      <div className="w-[70%] h-auto mx-auto mt-10 xs:w-11/12 xs:mt-0 ">
        <div className="flex">
          <div className="flex flex-col">
            <p className="text-2xl font-bold">목적지를 추가해보세요.</p>
            <p className="text-gray-400 mt-1">
              간단한 클릭으로 여행지를 추가할 수 있어요.
            </p>
          </div>
          <PostTravelStatus setTravelStatus={setTravelStatus} />
        </div>
        <PostTitle
          category={category}
          setCategory={setCategory}
          courseTitle={courseTitle}
          setCourseTitle={setCourseTitle}
        />
        <PostHashTag
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <PostMap />
      </div>
    </div>
    // </form>
  );
};

export default Post;
