import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface CourseProps {
  courseList: CourseListType[];
  filteredIdx: number | string;
  setFilteredIdx: Dispatch<SetStateAction<number>>;
}

const CourseInfo = ({
  courseList,
  filteredIdx,
  setFilteredIdx,
}: CourseProps) => {
  return (
    <div className="w-[40%] pl-7 float-right xs:hidden">
      <div className="flex flex-col h-[1024px] overflow-y-scroll ">
        {courseList?.map((item: CourseListType, idx: number) => {
          return (
            <ItemCard
              key={idx}
              onClick={() => setFilteredIdx(idx)}
              className={idx === filteredIdx ? "clicked" : ""}
            >
              <div className="w-full px-2 py-3 flex">
                <div className="w-full px-3">
                  <h4 className="text-xl font-bold">
                    #{idx + 1} {item.name}
                  </h4>
                  <div className="w-full h-auto mt-2 text-gray-04 text-sm">
                    <p>{item.address}</p>
                    <p>{item.road}</p>
                    <p>{item.phone}</p>
                  </div>
                  <p className="text-[14px] mt-2 leading-5">{item.memo}</p>
                </div>
              </div>
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
};

export default CourseInfo;

const ItemCard = styled.div`
  border: 1px solid #a0a4a8;
  margin-bottom: 32px;
  cursor: pointer;
  padding: 10px 5px;
  &.clicked {
    background: black;
    color: white;
  }
  @media screen and (max-width: 414px) {
    padding: 15px 20px 20px 20px;
    margin-bottom: 20px;
  }
`;
