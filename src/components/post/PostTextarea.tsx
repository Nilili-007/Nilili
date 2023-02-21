import { useDispatch, useSelector } from "react-redux";
import { editMemo, filterCourse } from "../../redux/modules/temporarySlice";
import styled from "styled-components";

const PostTextarea = ({ item, text, setText, setBoundsInfo }: any) => {
  const dispatch = useDispatch();

  const filteredId = useSelector(
    (state: any) => state.temporarySlice.filteredId
  );

  const onFocusGetId = (item: any) => {
    dispatch(filterCourse(item.id));
    setBoundsInfo(item.bounds);
  };

  const onBlurAddMemo = (item: any) => {
    const newMemo = {
      id: item.id,
      memo: text,
    };
    if (text) {
      dispatch(editMemo(newMemo));
      setText("");
    }
  };

  const onFocusEditMemo = (item: any) => {
    dispatch(filterCourse(item.id));
    setBoundsInfo(item.bounds);
    setText(item.memo);
    const newMemo = {
      id: item.id,
      memo: text,
    };
    dispatch(editMemo(newMemo));
  };

  return (
    <Textarea
      autoFocus
      placeholder={item.memo ? item.memo : "자유롭게 메모를 남겨보세요."}
      value={item.id === filteredId ? text : null}
      onChange={
        item.id === filteredId ? (e) => setText(e.target.value) : undefined
      }
      onFocus={
        item.memo ? () => onFocusEditMemo(item) : () => onFocusGetId(item)
      }
      onBlur={() => onBlurAddMemo(item)}
      className={item.memo ? "memo" : "null"}
    />
  );
};

export default PostTextarea;

const Textarea = styled.textarea`
  width: 100%;
  height: 80px;
  color: black;
  margin: 12px 0 0 12px;
  padding: 4px 0;
  font-size: 14px;
  &:focus {
    outline: none;
  }
  &.memo {
    ::placeholder {
      color: black;
    }
  }
  &.null {
    ::placeholder {
      color: gray;
    }
  }
`;
