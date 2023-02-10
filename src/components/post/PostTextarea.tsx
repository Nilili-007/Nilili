import { useDispatch, useSelector } from "react-redux";
import { addDesc } from "../../redux/modules/temporarySlice";

// 데이터 추가
// 데이터 삭제
// 데이터 내용 수정
// 코스 순서 변경시 순서 내용 반영해서 조회
// 장소 클릭시 해당 장소에 대한 설명만 textarea에 불러오기
// (설명 데이터가 없으면 빈칸, 있으면 미리 입력한 내용)

const PostTextarea = ({ id, text, setText }: any) => {
  const dispatch = useDispatch();

  const courseList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );

  const filteredCourse = useSelector(
    (state: any) => state.temporarySlice.filteredCourse
  );

  const onAddDesc = () => {
    const newDesc = {
      id: !filteredCourse ? courseList[0].id : id,
      desc: text,
    };
    dispatch(addDesc(newDesc));
    setText("");
  };

  return (
    <div className="flex flex-col">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="여행지를 소개해주세요."
        className="h-60 justify-end border border-black p-3 mt-4 xs:h-40"
      />
      <button
        onClick={onAddDesc}
        className="bg-gray-200 border border-black px-2 mt-3 float-right"
      >
        등록
      </button>
    </div>
  );
};

export default PostTextarea;
