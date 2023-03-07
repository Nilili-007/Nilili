import styled from "styled-components";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { useDownCourse, useUpCourse } from "../../hooks";

const CourseOrderBtns = ({ lists, item, idx }: any) => {
  const liftUp = useUpCourse();
  const liftDown = useDownCourse();

  return (
    <div className="flex text-2xl mt-3 float-right">
      <ItemBtn className={lists[0] === item ? "non-clicked" : ""}>
        <BsChevronUp onClick={() => liftUp(idx)} />
      </ItemBtn>
      <ItemBtn
        className={lists[lists.length - 1] === item ? "non-clicked" : ""}
      >
        <BsChevronDown onClick={() => liftDown(idx)} />
      </ItemBtn>
    </div>
  );
};

export default CourseOrderBtns;

const ItemBtn = styled.span`
  &.non-clicked {
    color: #cccccc;
  }
  &:first-child {
    margin-right: 20px;
  }
  @media screen and (max-width: 414px) {
    &:first-child {
      margin-right: 10px;
    }
  }
`;
