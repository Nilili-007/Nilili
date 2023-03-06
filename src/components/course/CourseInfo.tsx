import React from "react";
import styled from "styled-components";

const CourseInfo = ({ courseList, filteredIdx, setFilteredIdx }: any) => {
  const onClickGetId = (item: any, idx: number) => {
    setFilteredIdx(idx);
  };

  return (
    <div className="w-[472px] pl-7 float-right xs:hidden">
      <div className="flex flex-col h-[1024px] overflow-y-scroll ">
        {courseList?.map((item: any, idx: any) => {
          return (
            <ItemCard
              key={item.id}
              onClick={() => onClickGetId(item, idx)}
              className={idx === filteredIdx ? "clicked" : ""}
            >
              <div className="w-full px-2 py-3 flex">
                <div className="w-full px-3 text-lg">
                  <h4 className="title3">
                    #{idx + 1} {item.name}
                  </h4>
                  <div className="w-full h-auto mt-4 text-gray-04 text-[17px]">
                    <p>{item.address}</p>
                    <p>{item.road}</p>
                    <p>{item.phone}</p>
                  </div>
                  <p className="mt-4">{item.memo}</p>
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
  border: 1px solid #9ca3af;
  margin-bottom: 32px;
  cursor: pointer;
  &.clicked {
    background: black;
    color: white;
  }
`;
