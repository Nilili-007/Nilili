import styled from "styled-components";
import { useCourse } from "../../hooks";

interface CourseInfoProps {
  lists: object[];
  idx: number;
  item: CourseListType;
}

const CoursePlaceInfo = ({ lists, item, idx }: CourseInfoProps) => {
  const { filteredIdx } = useCourse();

  return (
    <div className="w-full h-auto text-gray-04 xs:mt-1 xs:text-sm">
      {lists.length > 0 ? (
        <>
          <PlaceName className={idx === filteredIdx ? "clicked" : " "}>
            #{idx + 1} {item.name}
          </PlaceName>
          <div className="w-full h-auto mt-2 text-gray-04 text-sm">
            <p>{item.address}</p>
            <p>{item.road}</p>
            <p>{item.phone}</p>
          </div>
        </>
      ) : (
        <h3 className="text-3xl font-bold">"여행지를 추가해주세요."</h3>
      )}
    </div>
  );
};

export default CoursePlaceInfo;

const PlaceName = styled.h4`
  font-weight: bold;
  font-size: 20px;
  color: black;
  margin-bottom: 6px;
  &.clicked {
    color: white;
  }
  @media screen and (max-width: 414px) {
    font-size: 20px;
    &.clicked {
      color: black;
    }
  }
`;
