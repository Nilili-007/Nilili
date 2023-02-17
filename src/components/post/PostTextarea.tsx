import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMemo,
  editMemo,
  filterCourse,
} from "../../redux/modules/temporarySlice";

// 데이터 추가
// 데이터 삭제
// 데이터 내용 수정
// 코스 순서 변경시 순서 내용 반영해서 조회
// 장소 클릭시 해당 장소에 대한 설명만 textarea에 불러오기
// (설명 데이터가 없으면 빈칸, 있으면 미리 입력한 내용)

const PostTextarea = ({ item }: any) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);

  const filteredId = useSelector(
    (state: any) => state.temporarySlice.filteredCourse
  );

  const onClickGetId = (item: any) => {
    dispatch(filterCourse(item.id));
  };

  const onClickAddMemo = (item: any) => {
    const newMemo = {
      id: item.id,
      memo: text,
    };
    if (text) {
      dispatch(editMemo(newMemo));
      setText("");
    }
  };

  const onClickEditMemo = (item: any) => {
    dispatch(filterCourse(item.id));

    const newMemo = {
      id: item.id,
      memo: text,
    };
    setEdit(false);
    setText(item.memo);
    dispatch(editMemo(newMemo));
  };

  const onClickDeleteMemo = (item: any) => {
    dispatch(deleteMemo(item.id));
  };

  return (
    <div>
      {item.memo ? (
        <>
          {edit === false ? (
            <>
              <p className="w-[105%] ml-3 mt-3 text-sm hover:bg-gray-100">
                {item.memo}
              </p>
              <div className="flex float-right mt-2 -mr-3">
                <button
                  onClick={() => onClickEditMemo(item)}
                  className="bg-black text-white px-2 py-1 mr-2"
                >
                  수정
                </button>
                <button
                  onClick={() => onClickDeleteMemo(item)}
                  className="bg-black text-white px-2 py-1"
                >
                  삭제
                </button>
              </div>
            </>
          ) : (
            <>
              <textarea
                autoFocus
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border-b border-gray-600 w-full h-20 mt-3 ml-3 py-1 text-sm focus:outline-none"
              />
            </>
          )}
        </>
      ) : (
        <>
          {item.id === filteredId ? (
            <textarea
              autoFocus
              placeholder="자유롭게 메모를 남겨보세요."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onClick={() => onClickGetId(item)}
              className="border-b border-gray-600 w-full h-20 mt-3 ml-3 py-1 text-sm focus:outline-none"
            />
          ) : (
            <>
              <textarea
                autoFocus
                placeholder="자유롭게 메모를 남겨보세요."
                onClick={() => onClickGetId(item)}
                className="border-b border-gray-600 w-full h-20 mt-3 ml-3 py-1 text-sm focus:outline-none"
              />
            </>
          )}
          <button
            onClick={() => onClickAddMemo(item)}
            className="bg-black text-white px-2 py-1 mt-1 -mr-3 float-right"
          >
            등록
          </button>
        </>
      )}
    </div>
  );
};

export default PostTextarea;
