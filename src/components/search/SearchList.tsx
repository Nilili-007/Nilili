import { useState } from "react";
import { Link } from "react-router-dom";
import SearchPagenation from "./SearchPagenation";
import { ListMap } from "../shared";
import styled from "styled-components";

interface ISearchListProps {
  filteredList: CourseType[] | undefined;
}

const SearchList = ({ filteredList }: ISearchListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredList
    ? filteredList.slice(firstPostIndex, lastPostIndex)
    : null;

  const totalContents: any = filteredList?.length;

  const pages = [];
  for (let i = 1; i <= Math.ceil(totalContents / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="my-10 3xl:w-[60%] 2xl:w-[70%] w-[90%] min-h-[1500px]">
      <ul className="flex flex-wrap justify-evenly">
        {currentPosts?.map((item) => (
          <Link
            to={`/course/${item.id}`}
            key={item.id}
            className="xl:w-[24%] lg:w-[32%] sm:w-[47%] w-[90%] pt-6 border-t-2 border-black  "
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
              {Number(JSON.parse(item.createdAt).substr(11, 2)) + 9}
              {JSON.parse(item.createdAt).substr(14, 2)}
            </p>
          </Link>
        ))}
      </ul>
      {/* pagenation */}
      <SearchPagenation
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pages={pages}
      />
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

  &:hover {
    ${StImg} {
      display: none;
    }
    ${StMap} {
      opacity: 100%;
    }
  }
`;
