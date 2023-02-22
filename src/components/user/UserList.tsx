import { useGetCourseQuery } from "../../redux/modules/apiSlice";
import { authService } from "../../utils/firebase";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type UserListType = {
  done: boolean;
  category: string;
};

const UserList = ({ done, category }: UserListType) => {
  const { data, isLoading, isError } = useGetCourseQuery();
  const userID = authService.currentUser?.uid;
  const [userData, setUserData] = useState<CourseType[]>();

  const filterData = () => {
    const mypaths = data?.filter(
      (item) => item.userID === userID && item.travelStatus === done
    );
    const mylikes = data?.filter(
      (item) => item.likesID?.includes(userID) && item.travelStatus === done
    );
    category === "MY" ? setUserData(mypaths) : setUserData(mylikes);
  };
  useEffect(() => {
    filterData();
    console.log("필터 데이터 실행");
  }, [data, category, done]);

  if (isLoading) {
    return <>로딩중....</>;
  }
  if (isError) {
    return <>에러가 발생했습니다.</>;
  }

  return (
    <div className="my-10 3xl:w-[60%] 2xl:w-[70%] w-[90%] ">
      <p className=" ml-4 my-[2%] w-fit xl:text-[55px] lg:text-[45px] sm:text-[35px] text-2xl font-bold  ">
        WHAT'S NEW?
      </p>
      <p className=" hidden sm:block ml-4 pb-5 w-fit text-xl text-[#999999]">
        NILILI 사용자가 가장 최근 올린 일정을 함께해보세요.
      </p>

      <ul>
        {userData?.map((item: CourseType) => (
          <Link to={`/course/${item.id}`} key={item.id}>
            <li className="md:w-[23%] w-[360px]  inline-block mx-3 pt-6 border-t-2 border-black   ">
              <div className="hover:transition-all w-[300px] h-[300px] bg-no-repeat bg-cover bg-center hover:bg-[url('https://user-images.githubusercontent.com/117059420/219529223-bb81ad92-30cc-4ca2-9ce1-3c7f5dd3a4dc.jpg')] bg-[url('https://user-images.githubusercontent.com/117059420/219529260-5546619d-ed8b-4bc1-86a9-829249a4cd64.jpg')]" />
              <p className="pr-4 ml-1 mt-5 mb-5 sm:text-2xl text-xl overflow-hidden font-black ">
                {item.title}
              </p>
              <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
                {item.nickname}
              </p>
              <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
                {item.createdAt}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
