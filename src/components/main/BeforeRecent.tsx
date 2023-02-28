import { useGetCourseQuery } from "../../redux/modules/apiSlice";
import { Link } from "react-router-dom";
import { ListMap } from "../shared";
import styled from "styled-components";
import { SyncLoader } from "react-spinners";

const BeforeRecent = () => {
  const { data, isLoading, isError } = useGetCourseQuery();
  if (isError) {
    return <>에러가 발생했습니다.</>;
  }

  return (
    <div className=" my-10 3xl:w-[60%] 2xl:w-[70%] w-[90%] ">
      <p className=" ml-4 my-[2%] w-fit xl:text-[55px] lg:text-[45px] sm:text-[35px] text-2xl font-bold  ">
        NOW PLANS
      </p>
      <p className=" hidden sm:block ml-4 pb-5 w-fit text-xl text-[#999999]">
        아직 고민 중이신가요? 이런 일정은 어떠세요?
      </p>
      {isLoading ? (
        <div className="w-full h-[388px] flex justify-center items-center">
          <SyncLoader color="#A0A4A8" margin={10} size={18} />
        </div>
      ) : null}
      <ul className="overflow-x-auto whitespace-nowrap no-scrollbar">
        {data
          ?.filter((item: CourseType) => item.travelStatus === false)
          .slice(0, 4)
          .map((item) => (
            <Link to={`/course/${item.id}`} key={item.id}>
              <li className="md:w-[23%] w-[360px]  inline-block mx-3 pt-6 border-t-2 border-black   ">
                <Stdiv>
                  <StMap>
                    <ListMap course={item} />
                  </StMap>
                  <StImg
                    src={item.cover}
                    alt="대표 사진"
                    className=" pt-6 border-t-2 border-black h-[324px] w-[300px]"
                  />
                </Stdiv>
                <p className="pr-4 ml-1 mt-5 mb-5 sm:text-2xl text-xl overflow-hidden font-black ">
                  {item.title}
                </p>
                <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
                  {item.nickname}
                </p>
                <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
                  {JSON.parse(item.createdAt).substr(0, 10)}{" "}
                  {Number(JSON.parse(item.createdAt).substr(11, 2)) + 9}
                  {":"}
                  {JSON.parse(item.createdAt).substr(14, 2)}
                </p>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default BeforeRecent;

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
