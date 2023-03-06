import { Link } from "react-router-dom";
import { ListMap, Pagenation } from "../shared";
import styled from "styled-components";
import { logEvent } from "../../utils/amplitude";
import usePagenation from "../../hooks/usePagenation";

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
    showPages,
    currentPages,
  } = usePagenation(filteredList, 12, 5);

  const currentPosts = filteredList
    ? filteredList.slice(firstPostIndex, lastPostIndex)
    : null;

  return (
    <div className="my-10 3xl:w-[60%] 2xl:w-[70%] w-[90%] min-h-[1500px]">
      <ul className="flex flex-wrap justify-evenly">
        {currentPosts?.map((item) => (
          <Link
            to={`/course/${item.id}`}
            key={item.id}
            className="xl:w-[24%] lg:w-[32%] sm:w-[47%] w-[90%] pt-6 border-t-2 border-black  "
            onClick={() =>
              item.travelStatus === true
                ? logEvent("post click", {
                    from: "검색페이지",
                    여행여부: "여행 후",
                  })
                : logEvent("post click", {
                    from: "검색페이지",
                    여행여부: "여행 전",
                  })
            }
          >
            <Stdiv>
              <StMap>
                <ListMap course={item} />
              </StMap>
              <StImg
                src={item.cover}
                alt="대표 사진"
                className=" border-black h-[324px] w-[300px]"
              />
            </Stdiv>

            <p className="pr-4 ml-1 mt-5 sm:h-16 h-14 sm:text-2xl text-xl overflow-hidden font-black ">
              {item.title}
            </p>
            <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
              {item.nickname}
            </p>
            <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
              {JSON.parse(item.createdAt).substr(0, 10)}{" "}
              {Number(JSON.parse(item.createdAt).substr(11, 2)) + 9}:
              {JSON.parse(item.createdAt).substr(14, 2)}
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
          showPages={showPages}
          currentPages={currentPages}
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
