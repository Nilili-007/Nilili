import { Link } from "react-router-dom";
import { CreatedDate, ListMap, Pagenation } from "../shared";
import styled from "styled-components";
import { logEvent } from "../../utils/amplitude";
import { usePagenation, useGetScreenSize } from "../../hooks";

interface ISearchListProps {
  filteredList: CourseType[] | undefined;
}

const SearchList = ({ filteredList }: ISearchListProps) => {
  const {
    firstPostIndex,
    lastPostIndex,
    pages,
    currentPage,
    setCurrentPage,
    pageArr,
    setPageArr,
    lastPage,
    firstPage,
    currentPages,
    positionY,
  } = usePagenation(filteredList, 12, 5, 900);

  useGetScreenSize();

  const currentPosts = filteredList
    ? filteredList.slice(firstPostIndex, lastPostIndex)
    : null;

  return (
    <div className="my-10 w-[85%] md:resp min-h-[100vh]">
      <ul className="flex flex-wrap">
        {currentPosts?.map((item) => (
          <Link
            to={`/course/${item.id}`}
            key={item.id}
            className="xl:w-[23%] lg:w-[31%] w-[48%] mr-[2%]  sm:pt-[2%] pt-[3%] border-t-2 border-black  mb-[5%]"
            onClick={() =>
              item.travelStatus === true
                ? logEvent("post click", {
                    from: "검색페이지",
                    여행여부: "여행 후기",
                  })
                : logEvent("post click", {
                    from: "검색페이지",
                    여행여부: "여행 계획",
                  })
            }
          >
            <Stdiv>
              <StMap>
                <ListMap
                  mapstyle={
                    window.innerWidth < 415
                      ? { width: "150px", height: "150px" }
                      : {
                          width: "290px",
                          height: "230px",
                        }
                  }
                  course={item}
                />
              </StMap>
              <StImg
                src={item.cover}
                alt="대표 사진"
                className=" border-black sm:h-[230px] sm:w-[290px] w-[150px] h-[150px] object-cover"
              />
            </Stdiv>

            <p className="ml-1  mt-[8%] mb-[2%] sm:h-[31px]  h-7 max-w-[290px] w-[98%] sm:text-[28px] text-lg overflow-hidden font-black ">
              {item.title}
            </p>
            <p className="ml-1 mt-[3%] font-medium  text-gray-400 sm:text-xl  text-base ">
              {item.nickname}
            </p>
            <p className="ml-1 mt-[3%]  font-medium  text-gray-400 sm:text-xl text-sm ">
              <CreatedDate createdAt={item.createdAt} />
            </p>
          </Link>
        ))}
      </ul>
      {/* pagenation */}
      {filteredList?.length === 0 ? null : (
        <Pagenation
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pages={pages}
          pageArr={pageArr}
          setPageArr={setPageArr}
          lastPage={lastPage}
          firstPage={firstPage}
          currentPages={currentPages}
          positionY={positionY}
        />
      )}
    </div>
  );
};

export default SearchList;

const StImg = styled.img`
  position: absolute;
  bottom: 0px;
`;

const StMap = styled.div`
  opacity: 0%;
`;

const Stdiv = styled.div`
  position: relative;
  overflow: hidden;

  &:hover {
    ${StImg} {
      display: none;
    }
    ${StMap} {
      opacity: 100%;
    }
  }
`;
