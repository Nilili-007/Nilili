import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddCourseMutation,
  useGetCourseQuery,
} from "../redux/modules/apiSlice";
import { authService } from "../utils/firebase";
import {
  PostHashTag,
  PostCategories,
  PostMap,
  PostHeader,
  PostTravelStatus,
} from "../components/post/index";
import { replaceAllData } from "../redux/modules/temporarySlice";

//select option의 타입
export interface optionType {
  value: string;
  label: string;
}

const Post = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addCourse] = useAddCourseMutation();
  const { data } = useGetCourseQuery();
  const [modalOpen, setModalOpen] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const ragionsRef = useRef<HTMLSelectElement>(null);

  // 커버
  const [uploadCover, setUploadCover] = useState("");
  const [galleryCover, setGalleryCover] = useState("");

  //지역 선택
  const [regions, setRegions] = useState<optionType[] | null>([]);
  const [courseTitle, setCourseTitle] = useState("");

  // 여행전/후 선택
  const [travelStatus, setTravelStatus] = useState<boolean | null>(null);

  //해시태그 선택
  const [selectedTags, setSelectedTags] = useState<optionType[] | null>([]);

  //navigate할 때 쓸 state
  const [condition, setCondition] = useState(false);

  const userID = authService.currentUser?.uid;

  const courseList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );

  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  const onClickAddPost = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    //selectedTags는 오브젝트 배열입니다.
    //hashtag는 데이터베이스에 문자열 배열로 들어가야 하기 때문에, value 값만 추출하여 문자열배열로 바꿉니다.
    let selectedLabels = selectedTags?.map((tag) => tag.label);
    let selectedRegions = regions?.map((region) => region.value);

    const newPost = {
      location: selectedRegions,
      hashtags: selectedLabels,
      title: courseTitle,
      travelStatus,
      courseList: JSON.stringify(courseList),
      cover: uploadCover || galleryCover,
      userID,
      nickname: authService.currentUser?.displayName,
      createdAt: JSON.stringify(new Date()),
      likes: 0,
      likesID: [],
    };

    if (
      (uploadCover || galleryCover) &&
      travelStatus !== null &&
      regions &&
      courseTitle.trim() &&
      courseList.length > 1
    ) {
      await addCourse(newPost);
      setCondition(true);
      window.alert("훌륭한 여정이에요! 여행 후 리뷰도 꼭 부탁드려요!");
    } else {
      if (!uploadCover && !galleryCover) {
        alert("커버 이미지를 추가해주세요.");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (travelStatus === null) {
        alert("여행 전/여행 후 카테고리를 선택해주세요.");
        window.scrollTo({ top: 450, behavior: "smooth" });
      }
      if (!regions) {
        alert("하나 이상의 지역을 선택해주세요.");
        ragionsRef.current?.focus();
      }
      if (!courseTitle?.trim()) {
        alert("제목을 입력해주세요.");
        titleRef.current?.focus();
      }
      if (courseList.length < 2) {
        alert("2개 이상의 코스를 등록해주세요.");
      }
    }
  };

  const onClickCancel = () => {
    if (window.confirm("이 페이지에서 나가시겠습니까?")) {
      navigate(`/`);
      dispatch(replaceAllData([]));
    }
  };

  useEffect(() => {
    if (condition && data) {
      navigate(`/course/${data[0].id}`);
      setCondition(false);
    }
  }, [data]);

  return (
    <div className="mb-[7%]">
      <PostHeader
        uploadCover={uploadCover}
        setUploadCover={setUploadCover}
        galleryCover={galleryCover}
        setGalleryCover={setGalleryCover}
        courseTitle={courseTitle}
        setCourseTitle={setCourseTitle}
      />
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
        <div className="flex items-center">
          <PostCategories
            ragionsRef={ragionsRef}
            regions={regions}
            setRegions={setRegions}
          />
          <button
            onClick={() => showModal()}
            className="w-[14%] bg-black text-white text-lg px-4 py-1 ml-auto hover:text-black hover:border-black hover:border-2 hover:bg-white"
          >
            목적지 추가하기
          </button>
        </div>
        <PostHashTag
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <PostMap modalOpen={modalOpen} setModalOpen={setModalOpen} />
        <div className="flex w-full justify-center gap-[5%] my-10">
          <button
            onClick={(e) => onClickAddPost(e)}
            className="w-[25%] bg-black border-black border-2 text-white text-lg py-3 hover:text-black hover:bg-white "
          >
            게시물 등록하기
          </button>
          <button
            onClick={onClickCancel}
            className="w-[25%] bg-black border-black border-2 text-white text-lg py-3 hover:text-black hover:bg-white "
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
