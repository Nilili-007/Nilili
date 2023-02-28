import React from "react";
import styled from "styled-components";

const CourseInfo = ({ courseList, filteredId, setFilteredId }: any) => {
  const onClickGetId = (item: any) => {
    setFilteredId(item.id);
  };

  return (
    <div className="w-[35%] ml-7 ">
      <div className="flex flex-col h-full overflow-y-scroll">
        {courseList?.map((item: any, key: any) => {
          return (
            <ItemCard
              key={item.id}
              onClick={() => onClickGetId(item)}
              className={item.id === filteredId ? "clicked" : ""}
            >
              <div className="w-full px-2 py-3 flex">
                <div className="w-full px-3 text-lg">
                  <h4 className="font-bold text-2xl">
                    #{key + 1} {item.name}
                  </h4>
                  <p className="mt-1.5">{item.address}</p>
                  <p>{item.road}</p>
                  <p>{item.phone}</p>
                  <p className="mt-1.5 text-gray-400">{item.memo}</p>
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
