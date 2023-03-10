import styled from "styled-components";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { useCourse } from "../../hooks";

interface CourseInfoProps {
  lists: object[];
  idx: number;
  item: CourseListType;
}

const CourseOrderBtns = ({ lists, item, idx }: CourseInfoProps) => {
  const { liftUp } = useCourse();
  const { liftDown } = useCourse();

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
