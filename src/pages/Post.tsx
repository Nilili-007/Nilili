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
import { authService } from "../utils/firebase";

//select option의 타입
export interface optionType {
  value: string;
  label: string;
}

const Post = () => {
  const navigate = useNavigate();
  const [addCourse] = useAddCourseMutation();

  //지역 선택
  const [ragions, setRagions] = useState<optionType[] | null>([]);
  const [courseTitle, setCourseTitle] = useState("");

  // 여행전/후 선택
  const [travelStats, setTravelStatus] = useState();

  //해시태그 선택
  const [selectedTags, setSelectedTags] = useState<optionType[] | null>([]);

  const userID = authService.currentUser?.uid;
  //Hashtag 테스트용 submit handler
  const submitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //selectedTags는 오브젝트 배열입니다.
    //hashtag는 데이터베이스에 문자열 배열로 들어가야 하기 때문에, value 값만 추출하여 문자열배열로 바꿉니다.
    let selectedValues = selectedTags?.map((tag) => tag.value);

    const newPost = {
      location: ragions,
      hashtags: selectedValues,
      title: courseTitle,
      image: "/assets/course.jpg",
      createdAt: JSON.stringify(new Date()),
      likes: 70,
      likesID: [userID],
      userID,
      nickname: "선형",
      isDone: true,
      places: [],
    };

    await addCourse(newPost); //비동기 제일 마지막에 실행됌. eventloop - 공부
    //usemutation에 onSuccess
    window.alert("게시물이 등록되었습니다");
    navigate(`/course/1`);
  };

  // 게시글 데이터 DB : uuid, createdAt, 카테고리, 제목, 해시태그, initialPlace

  return (
    // <form onSubmit={submitHandle}>
    <div className="h-[100vh] mb-20">
      <PostHeader />
      <div className="w-[70%] h-auto mx-auto mt-10 xs:w-11/12 xs:mt-0 ">
        <div className="flex">
          <div className="flex flex-col">
            <p className="text-2xl font-bold">목적지를 추가해보세요.</p>
            <p className="text-gray-400 mt-1">
              간단한 클릭으로 여행지를 추가할 수 있어요.
            </p>
          </div>
          <PostTravelStatus
            travelStatus={travelStats}
            setTravelStatus={setTravelStatus}
          />
        </div>
        <PostTitle
          ragions={ragions}
          setRagions={setRagions}
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
