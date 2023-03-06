import React, { useState } from "react";
import styled from "styled-components";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const CourseMobile = ({ course, filteredIdx, setFilteredIdx }: any) => {
  const [openCourse, setOpenCourse] = useState(false);
  const lists = JSON.parse(course?.courseList);

  const handleOpenCourse = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setOpenCourse(!openCourse);
  };

  return (
    <div className="lg:hidden 3xl:hidden xs:flex xs:flex-col">
      <ItemCard>
        <div className="flex">
          <div>
            <h4 className="font-bold text-[20px]">
              #{filteredIdx + 1} {lists[filteredIdx]?.name}
            </h4>
            <div className="w-full h-auto mt-1 text-gray-04">
              <p>{lists[filteredIdx]?.address}</p>
              <p>{lists[filteredIdx]?.road}</p>
              <p>{lists[filteredIdx]?.phone}</p>
            </div>
            <p className="mt-1">{lists[filteredIdx]?.memo}</p>
          </div>
        </div>
      </ItemCard>
      {lists.length > 0 ? (
        <button
          onClick={(event) => handleOpenCourse(event)}
          className="lg:hidden 3xl:hidden w-full h-14 border border-gray-03 mb-6 text-[20px] font-bold px-4"
        >
          <div className="lg:hidden 3xl:hidden flex justify-between items-center">
            {openCourse ? (
              <>
                전체 일정 접기
                <BsChevronUp />
              </>
            ) : (
              <>
                전체 일정 열기
                <BsChevronDown />
              </>
            )}
          </div>
        </button>
      ) : null}
      {lists.length > 0 ? (
        <>
          {openCourse && (
            <>
              {lists.map((item: any, idx: number) => {
                return (
                  <ItemCard key={idx} onClick={() => setFilteredIdx(idx)}>
                    <div className="flex">
                      <div>
                        <h4 className="font-bold text-[20px]">
                          #{idx + 1} {item.name}
                        </h4>
                        <div className="w-full h-auto mt-1 text-gray-04 text-sm">
                          <p>{item.address}</p>
                          <p>{item.road}</p>
                          <p>{item.phone}</p>
                        </div>
                        <p className="mt-1">{item.memo}</p>
                      </div>
                    </div>
                  </ItemCard>
                );
              })}
            </>
          )}
        </>
      ) : null}
    </div>
  );
};

export default CourseMobile;

const ItemCard = styled.div`
  border: 1px solid #cbcdd2;
  margin-bottom: 32px;
  cursor: pointer;
  padding: 20px;
  &.clicked {
    background: black;
    color: white;
  }
`;
