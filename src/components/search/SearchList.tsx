import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetCourseQuery } from "../../redux/modules/apiSlice";
import SearchPagenation from "./SearchPagenation";

interface ISearchListProps {
  filteredList: CourseType[] | undefined;
}

const SearchList = ({ filteredList }: ISearchListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  const { isLoading, isError, error } = useGetCourseQuery();

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

  if (isError) {
    console.log(error);
  }

  return (
    <div className=" my-10 3xl:w-[60%] 2xl:w-[70%] w-[90%] ">
      <ul className="flex flex-wrap justify-evenly">
        {isLoading ? <h2>데이터를 불러오고 있습니다</h2> : null}
        {currentPosts?.map((item) => (
          <Link
            to={`/course/${item.id}`}
            key={item.id}
            className="xl:w-[24%] lg:w-[32%] sm:w-[47%] w-[90%] pt-6 border-t-2 border-black  "
          >
            <img
              src={item.cover}
              alt="대표 사진"
              className=" border-t-2 h-[200px] w-[300px]"
            />
            <p className="pr-4 ml-1 mt-5 sm:h-16 h-14 sm:text-2xl text-xl overflow-hidden font-black ">
              {item.title}
            </p>
            <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
              {item.nickname}
            </p>
            <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
              {item.createdAt}
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
