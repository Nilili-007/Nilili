import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import {
  CourseLine,
  PostBtn,
  PostHashTag,
  PostSearchModal,
  PostTitle,
} from "../components/post";

import { CourseDesc } from "../components/course";

import { useNavigate } from "react-router-dom";
import { useAddCourseMutation } from "../redux/modules/apiSlice";
import { authService } from "../utils/firebase";
interface IinitialList {
  name: string;
}

//select option의 타입
export interface optionType {
  value: string;
  label: string;
}

const Post = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [targetPlace, setTargetPlace] = useState("");
  const [addCourse] = useAddCourseMutation();

  const initialList: IinitialList[] = [
    { name: "PKM갤러리" },
    { name: "페로탕" },
    { name: "국제갤러리" },
    { name: "학고재" },
    { name: "국립현대미술관" },
  ];
  const [placeList, setPlaceList] = useState(initialList);

  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  //카테고리 선택
  const [category, setCategory] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  //해시태그 선택
  const [selectedTags, setSelectedTags] = useState<optionType[] | null>([]);

  const userID = authService.currentUser?.uid;

  //Hashtag 테스트용 submit handler
  const submitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //selectedTags는 오브젝트 배열입니다.
    //hashtag는 데이터베이스에 문자열 배열로 들어가야 하기 때문에, value 값만 추출하여 문자열배열로 바꿉니다.
    let selectedValues = selectedTags?.map((tag) => tag.value);
    const newPost = {
      location: category,
      hashtags: selectedValues,
      title: courseTitle,
      image: "/assets/course.jpg",
      createdAt: JSON.stringify(new Date()),
      likes: 80,
      likesID: [userID],
      userID,
      nickname: "선형",
      isDone: false,
      places: [],
    };

    addCourse(newPost);
    navigate("/course");
  };

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
        <div className="w-full h-96 border border-black mt-5 flex justify-center items-center xs:h-48 xs:mt-0">
          지도
        </div>
        <div className="flex justify-end -mt-20 mr-4 xs:-mt-12 xs:mr-2">
          <AiFillPlusCircle
            className="text-6xl cursor-pointer xs:text-4xl"
            onClick={showModal}
          />
        </div>
        {modalOpen && <PostSearchModal setModalOpen={setModalOpen} />}
        <CourseLine
          setTargetPlace={setTargetPlace}
          placeList={placeList}
          setPlaceList={setPlaceList}
        />
        <div className="flex mt-5 mb-10">
          <div className="w-1/2 h-96 border border-black mr-4 flex justify-center items-center xs:hidden">
            사진
          </div>
          <div className="flex flex-col w-1/2 xs:w-full">
            <CourseDesc targetPlace={targetPlace} placeList={placeList} />
            <textarea
              placeholder="여행지를 소개해주세요."
              className="h-60 justify-end border border-black p-3 xs:h-40"
            />
            <button className="bg-gray-200 border border-black px-2 mt-3 float-right">
              등록
            </button>
          </div>
        </div>
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
