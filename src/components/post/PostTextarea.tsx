import { useEffect, useState } from "react";
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

  const [postDescList, setPostDescList] = useState<any | null>([]);

  const courseList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );

  const filteredCourse = useSelector(
    (state: any) => state.temporarySlice.filteredCourse
  );

  const filteredId = !filteredCourse ? courseList[0].id : id;

  const newDesc = {
    id: filteredId,
    desc: text,
  };

  useEffect(() => {
    return () => {
      if (text) {
        setPostDescList([...postDescList, newDesc]);
      }
      setText("");
    };
  }, [filteredId]);

  const test = postDescList?.filter((item: any) => {
    if (item.id === filteredCourse.id) {
      return item;
    }
  });

  const onClickNext = () => {
    dispatch(addDesc(newDesc));
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          test[0] === undefined ? "여행지를 소개해주세요." : test[0].desc
        }
        className="w-[95%] h-[150px] focus:outline-none mt-2 px-2 py-1 border border-black"
      />
      <div className="pr-4">
        <button
          onClick={onClickNext}
          className="px-2 py-1 bg-gray-200 rounded-lg border border-black float-right hover:bg-red-100"
        >
          다음 코스에 대한 설명을 등록해주세요!
        </button>
      </div>
    </div>
  );
};

export default PostTextarea;
