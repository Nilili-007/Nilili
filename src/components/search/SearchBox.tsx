import { useState, useEffect } from "react";
import Select from "react-select";
import SearchList from "./SearchList";
import { useGetCourseQuery } from "../../redux/modules/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { changeHashTagNum } from "../../redux/modules/searchSlice";
import { hashTagOptions } from "../post/PostHashTag";
import { regionOptions } from "../post/PostTitle";

const travelStatusOptions = [
  { value: false, label: "여행 전" },
  { value: true, label: "여행 후" },
];

const SearchBox = () => {
  const linkedHashtagNum = useSelector(
    (state: any) => state.searchSlice.hashtagNumber
  );
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetCourseQuery();

  const [locations, setLocations] = useState<optionType[] | null>([]);
  const [hashtags, sethashtags] = useState<optionType[] | null>([]);
  const [words, setWords] = useState("");
  const [travelStatus, setTravelStatus] = useState<boolean>();

  const [filteredList, setFilteredList] = useState<CourseType[]>();

  //셀렉트한 데이터 State에 반영하기
  const locationOnChangeHandler = (data: any) => {
    setLocations(data);
  };

  const hashtagOnChangeHandler = (data: any) => {
    sethashtags(data);
  };

  const travelStatusOnChangeHandler = (data: any) => {
    setTravelStatus(data?.value);
  };

  //섹렉트된 데이터 형태 object에서 string[]으로 바꾸기
  let locationsArr = locations?.map((item) => item.value);

  let hashtagsArr = hashtags?.map((item) => item.value);

  //sample 배열이 base배열의 부분 함수인지 여부 true, false로 반환하는 함수
  const isSubsetOf = function (
    base: string[] | undefined,
    sample: string[] | undefined
  ) {
    return sample?.every((item: any) => base?.includes(item));
  };

  // 선택된 검색 옵션이 없으면 전체 데이터 보여주기
  const filterData = () => {
    if (
      words.length === 0 &&
      locationsArr?.length === 0 &&
      hashtagsArr?.length === 0 &&
      travelStatus === undefined
    ) {
      setFilteredList(data);
    }
    // 지역, 해시태그, 키워드(제목, 코스 각각의 이름, 지번주소, 도로명 주소, 메모), 여행 전/후 여부에 따라 필터링
    else {
      const filteredData: CourseType[] | undefined = data
        ?.filter((item) => isSubsetOf(item.location, locationsArr))
        .filter((item) => isSubsetOf(item.hashtags, hashtagsArr))
        .filter(
          (item) =>
            item.title.toLowerCase().includes(words.toLowerCase()) ||
            JSON.parse(item.courseList).filter(
              (item: CourseListType) =>
                item.name.toLowerCase().includes(words.toLowerCase()) ||
                item.address.toLowerCase().includes(words.toLowerCase()) ||
                item.road.toLowerCase().includes(words.toLowerCase()) ||
                item.memo?.toLowerCase().includes(words.toLowerCase())
            ).length !== 0
        )
        .filter((item) =>
          travelStatus === undefined ? true : item.travelStatus === travelStatus
        );
      setFilteredList(filteredData);
    }
  };

  //맨 처음 렌더링, 새로고침 할 때 전체 데이터 보여주기
  useEffect(() => {
    filterData();
  }, [hashtags, locations, travelStatus, words, data]);

  //메인페이지에서 해시태그 링크로 들어올 때 자동검색
  //페이지 나갈 때 해시태그 자동검색 없애기
  useEffect(() => {
    if (linkedHashtagNum !== null) {
      const linkSetHashtag = () => {
        sethashtags([hashTagOptions[linkedHashtagNum]]);
      };
      linkSetHashtag();
    }
    return () => {
      dispatch(changeHashTagNum(null));
    };
  }, []);

  return (
    <>
      <div className="mb-[2%] 3xl:w-[60%] 2xl:w-[70%] w-[90%] min-w-[370px]">
        <p className=" w-fit mx-auto xl:text-[55px] lg:text-[45px] sm:text-[35px]  text-2xl font-bold my-[5%]">
          WHAT ARE YOUR PLANS?
        </p>
        <div className="border  border-black flex flex-col items-center gap-5  p-[40px]">
          <div className="flex flex-row indent-2 bg-red-300">
            <div>지역</div>
            <Select
              options={regionOptions}
              placeholder={"지역명"}
              autoFocus={true}
              isMulti
              isSearchable={true}
              isClearable={true}
              onChange={locationOnChangeHandler}
            />
          </div>
          <div className="flex flex-row indent-2 ">
            <div>해시태그</div>
            <Select
              options={hashTagOptions}
              isMulti
              isSearchable={true}
              isClearable={true}
              placeholder={"#해시태그"}
              onChange={hashtagOnChangeHandler}
              value={hashtags}
            />
          </div>

          <div className="flex flex-row indent-2 ">
            <div>여행 전/후</div>
            <Select
              isClearable={true}
              options={travelStatusOptions}
              onChange={travelStatusOnChangeHandler}
            />
          </div>

          <div className="flex flex-row indent-2 ">
            <div>검색어</div>
            <input
              className={
                "rounded-sm indent-4 border border-gray-300 w-[90%] h-[38px]"
              }
              placeholder="입력하세요."
              value={words}
              onChange={(event) => setWords(event.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 나올 수 있는 리스트 상태 구분 */}
      {filteredList?.length === 0 ? (
        <p>검색결과가 없습니다.</p>
      ) : isLoading ? (
        <p>로딩 중입니다.</p>
      ) : isError ? (
        <p>에러가 발생했습니다.</p>
      ) : (
        <SearchList filteredList={filteredList} />
      )}
    </>
  );
};

export default SearchBox;
