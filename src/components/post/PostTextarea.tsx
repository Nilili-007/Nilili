import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMemo, editMemo } from "../../redux/modules/temporarySlice";

// 데이터 추가
// 데이터 삭제
// 데이터 내용 수정
// 코스 순서 변경시 순서 내용 반영해서 조회
// 장소 클릭시 해당 장소에 대한 설명만 textarea에 불러오기
// (설명 데이터가 없으면 빈칸, 있으면 미리 입력한 내용)

const PostTextarea = ({ id, item, text, setText, onClickGetId }: any) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  console.log(item.id, item.name);

  const courseList = useSelector(
    (state: any) => state.temporarySlice.courseList
  );

  const descList = useSelector((state: any) => state.temporarySlice.descList);

  const filteredCourse = useSelector(
    (state: any) => state.temporarySlice.filteredCourse
  );

  const filteredKey = useSelector(
    (state: any) => state.temporarySlice.filteredKey
  );

  const defaultDesc = descList?.filter((item: any) => {
    if (item.id === filteredCourse.id) {
      return item;
    }
  });

  const defaultText = defaultDesc[0]?.desc;

  // 1. courseList에서 filteredId와 일치하는 아이템의 인덱스 구하기
  // 2. filteredKey와 1번 값이 일치하면 close, 불일치하는 모든 아이템은 open

  // descList에 filteredId와 일치하는 아이템이 있다면 추가 제한

  const filteredId = !filteredCourse ? courseList[0].id : id;

  const newDesc = {
    id: filteredId,
    desc: text,
  };

  // const onClickGetId = (item: any) => {};

  const onClickAddDesc = () => {
    // dispatch(addDesc(newDesc));
  };

  const onClickEditBtn = () => {
    setEdit(true);
    setText(defaultText);
  };

  const onClickEditDesc = () => {
    setEdit(false);
    dispatch(editMemo(newDesc));
  };

  const onClickDeleteDesc = () => {
    // 모달로 변경
    if (window.confirm("일정에서 삭제하시겠습니까?")) {
      return dispatch(deleteMemo(filteredId));
    }
    setText("");
  };

  return (
    <div>
      {defaultDesc.length === 0 ? (
        <>
          <textarea
            value={text}
            onClick={onClickGetId}
            onChange={(e) => setText(e.target.value)}
            placeholder="여행지를 소개해주세요."
            className="w-[100%] h-[50px] focus:outline-none mt-2 px-2 py-1 text-black border border-black"
          />
          <button
            onClick={onClickAddDesc}
            className="px-2 py-1 bg-gray-200 text-black border border-black float-right"
          >
            등록
          </button>
        </>
      ) : (
        <>
          {edit === false ? (
            <>
              <p className="mt-3">{defaultText}</p>
              <div className="float-right pr-7 mt-3">
                <button
                  onClick={onClickEditBtn}
                  className="px-2 py-1 bg-gray-200 rounded-lg border border-black hover:bg-red-100 mr-1"
                >
                  수정
                </button>
                <button
                  onClick={onClickDeleteDesc}
                  className="px-2 py-1 bg-gray-200 rounded-lg border border-black hover:bg-red-100"
                >
                  삭제
                </button>
              </div>
            </>
          ) : (
            <>
              <textarea
                onClick={() => onClickGetId(item)}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-[100%] h-[50px] focus:outline-none mt-2 px-2 py-1 border border-black"
              />
              <div className="pr-4">
                <button
                  onClick={onClickEditDesc}
                  className="px-2 py-1 bg-gray-200 rounded-lg float-right border border-black hover:bg-red-100"
                >
                  완료
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PostTextarea;
