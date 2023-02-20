import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddCourseMutation } from "../redux/modules/apiSlice";
import { authService } from "../utils/firebase";
import {
  PostHashTag,
  PostTitle,
  PostMap,
  PostHeader,
  PostTravelStatus,
} from "../components/post/index";

//select option의 타입
export interface optionType {
  value: string;
  label: string;
}

const Post = () => {
  const navigate = useNavigate();
  const [addCourse] = useAddCourseMutation();

  // 커버 선택
  const [coverImg, setCoverImg] = useState("");

  //지역 선택
  const [category, setCategory] = useState("");
  const [courseTitle, setCourseTitle] = useState("");

  // 여행전/후 선택
  const [travelStatus, setTravelStatus] = useState<boolean | null>(null);

  //해시태그 선택
  const [selectedTags, setSelectedTags] = useState<optionType[] | null>([]);

  const userID = authService.currentUser?.uid;

  const courseList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );

  const onClickAddPost = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    //selectedTags는 오브젝트 배열입니다.
    //hashtag는 데이터베이스에 문자열 배열로 들어가야 하기 때문에, value 값만 추출하여 문자열배열로 바꿉니다.
    let selectedValues = selectedTags?.map((tag) => tag.value);

    const newPost = {
      title: courseTitle,
      travelStatus,
      location: category,
      hashtags: selectedValues,
      courseList: JSON.stringify(courseList),
      coverImg,
      userID,
      nickname: authService.currentUser?.displayName,
      createdAt: Date.now(),
      likes: 0,
      likesID: [],
    };

    if (
      coverImg &&
      (travelStatus || !travelStatus) &&
      category &&
      courseTitle &&
      courseList.length > 1
    ) {
      addCourse(newPost);
      console.log(newPost);
      window.alert("훌륭한 여정이에요! 여행 후 리뷰도 꼭 부탁드려요!");
      navigate(`/course/1`);
    } else {
      if (!coverImg) {
        alert("커버 이미지를 추가해주세요.");
      }
      if (travelStatus === null) {
        alert("여행 전/여행 후 카테고리를 선택해주세요.");
      }
      if (!category) {
        alert("하나 이상의 지역을 선택해주세요.");
      }
      if (!courseTitle) {
        alert("제목을 입력해주세요.");
      }
      if (courseList.length < 2) {
        alert("2개 이상의 코스를 등록해주세요.");
      }
    }
  };

  return (
    <div className="max-h-[130vh] mb-[7%]">
      <PostHeader coverImg={coverImg} setCoverImg={setCoverImg} />
      <div className="w-[70%] h-auto mx-auto mt-10 xs:w-11/12 xs:mt-0 ">
        <div className="flex">
          <div className="flex flex-col">
            <p className="text-2xl font-bold">목적지를 추가해보세요.</p>
            <p className="text-gray-400 mt-1">
              간단한 클릭으로 여행지를 추가할 수 있어요.
            </p>
          </div>
          <PostTravelStatus
            travelStatus={travelStatus}
            setTravelStatus={setTravelStatus}
          />
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
        <div className="flex justify-center mt-7 ">
          <button
            onClick={(e) => onClickAddPost(e)}
            className="w-[280px] bg-black text-white text-lg py-3 mx-auto"
          >
            게시물 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
