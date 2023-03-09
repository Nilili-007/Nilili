import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import SearchList from "./SearchList";
import {
  useGetCourseQuery,
  useGetCourseConditionallyQuery,
} from "../../redux/modules/apiSlice";
import { hashTagOptions } from "../post/PostHashTag";
import { regionOptions } from "../post/PostCategories";
import { logEvent } from "../../utils/amplitude";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { ColorStyles } from "../shared";
import { GrPowerReset } from "react-icons/gr";

const travelStatusOptions: any = [
  { value: false, label: "여행 계획" },
  { value: true, label: "여행 후기" },
];

const SearchBox = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<optionType[]>([]);
  const [hashtags, sethashtags] = useState<optionType[]>([]);
  const [hashtags2, sethashtags2] = useState<optionType[]>([]);
  const [words, setWords] = useState("");
  const [travelStatus, setTravelStatus] = useState<optionType | undefined>();
  const [filteredList, setFilteredList] = useState<CourseType[]>();
  const [searchParams] = useSearchParams();
  const { data } = useGetCourseQuery();

  const selectInputRef = useRef<any>(null);

  const onClearSelect = () => {
    if (selectInputRef.current) {
      selectInputRef.current.clearValue();
    }
  };

  const {
    data: conditionData,
    isLoading,
    isError,
  } = useGetCourseConditionallyQuery(travelStatus ? travelStatus.value : "");

  //섹렉트된 데이터 형태 object에서 string[]으로 바꾸기
  let locationsArr = locations?.map((item) => item.value);
  let hashtagsArr = hashtags?.map((item) => item.label);

  //셀렉트한 데이터 State에 반영하기
  const locationOnChangeHandler = (data: any) => {
    setLocations(data);
  };

  const hashtagOnChangeHandler = (data: any) => {
    sethashtags(data);
  };

  const travelStatusOnChangeHandler = (data: any) => {
    setTravelStatus(data);
  };

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
    // 지역, 해시태그, 키워드(제목, 코스 각각의 이름, 지번주소, 도로명 주소, 메모)에 따라 필터링
    // 여행 여부 필터링은 firebase에서 해서 가져온다.
    else {
      const filteredData: CourseType[] | undefined = (
        travelStatus !== undefined ? conditionData : data
      )
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
        );
      setFilteredList(filteredData);
    }
    logEvent("게시물 검색", {
      from: "검색페이지",
      filter: {
        해시태그: hashtagsArr,
        지역: locationsArr,
        여행여부: travelStatus,
        검색어: words,
      },
    });
  };

  //맨 처음 렌더링, 새로고침 할 때 전체 데이터 보여주기
  useEffect(() => {
    filterData();
  }, [data]);

  //해시태그 리스트 클릭해서 들어왔을 때 바로 검색
  useEffect(() => {
    filterData();
  }, [hashtags2]);

  useEffect(() => {
    const emptyArr: optionType[] = [];
    //파람스 값 검색에 넣기
    setLocations(
      // @ts-ignore
      searchParams.get("lc") === null
        ? emptyArr
        : // @ts-ignore
          JSON.parse(searchParams.get("lc"))
    );

    sethashtags(
      // @ts-ignore
      searchParams.get("ht") === null
        ? emptyArr
        : // @ts-ignore
          JSON.parse(searchParams.get("ht"))
    );

    sethashtags2(
      // @ts-ignore
      searchParams.get("ht") === null
        ? emptyArr
        : // @ts-ignore
          JSON.parse(searchParams.get("ht"))
    );
    setWords(
      // @ts-ignore
      searchParams.get("ws") === null
        ? "" // @ts-ignore
        : searchParams.get("ws")
    );

    if (searchParams.get("ts") !== "undefined") {
      setTravelStatus(
        searchParams.get("ts") === null
          ? undefined
          : // @ts-ignore
            JSON.parse(searchParams.get("ts"))
      );
    } else {
      setTravelStatus(undefined);
    }
  }, [searchParams]);

  return (
    <>
      <div className="mb-[2%]  w-[85%] md:w-[70%] h-auto  min-w-[300px]">
        <p className="w-fit mx-auto xl:text-[50px] lg:text-[45px] sm:text-[35px] text-2xl font-bold font-eng  my-[5%] ">
          EXPLORE YOUR PLANS
        </p>
        <div className="w-full border border-black flex flex-col items-center  ">
          <div className="w-full flex flex-row justify-between indent-2">
            <div className="body2 w-[180px] p-[1%] sm:p-4 xs:body3 text-white bg-black hidden md:block">
              지역 검색
            </div>

            <Select
              className="z-50 w-full m-[0.5%] sm:m-[1%]  leading-7 text-[22px] xs:body3"
              classNamePrefix="select"
              options={regionOptions}
              placeholder={"지역명"}
              autoFocus={true}
              isMulti
              isSearchable={false}
              isClearable={true}
              onChange={locationOnChangeHandler}
              value={locations}
              styles={ColorStyles}
            />
          </div>

          <div className="w-full flex flex-row indent-2 ">
            <div className="body2 w-[180px] p-[1%] sm:p-4  xs:body3 text-white bg-black hidden md:block">
              #해시태그
            </div>
            <Select
              className="z-30 w-full m-[0.5%] sm:m-[1%]  leading-7 text-[22px] xs:body3"
              classNamePrefix="select"
              options={hashTagOptions}
              isMulti
              isSearchable={false}
              isClearable={true}
              placeholder={"#해시태그"}
              onChange={hashtagOnChangeHandler}
              value={hashtags}
              styles={ColorStyles}
            />
          </div>

          <div className="w-full flex flex-row indent-2 ">
            <div className="body2 w-[180px] p-[1%] sm:p-4  xs:body3 text-white bg-black hidden md:block">
              검색어
            </div>
            <input
              type="search"
              className={
                "placeholder:sm:text-[22px] placeholder:text-[16px] placeholder:text-[#808080] sm:font-normal font-medium indent-4 border border-gray-300 w-full m-[0.5%] sm:m-[1%] h-[38px] placeholder:text-sm"
              }
              placeholder="검색어를 입력하세요."
              value={words}
              onChange={(event) => setWords(event.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  navigate(
                    `/search?lc=${JSON.stringify(
                      locations
                    )}&ht=${JSON.stringify(hashtags)}&ts=${JSON.stringify(
                      travelStatus
                    )}&ws=${words}`
                  );
                  filterData();
                }
              }}
            />
          </div>

          <div className="w-full flex flex-row indent-2 ">
            <div className="body2 w-[180px] p-[1%] sm:p-4   xs:body3 text-white bg-black hidden md:block">
              계획 / 후기
            </div>
            <Select
              className="z-20 w-full m-[0.5%] sm:m-[1%]  leading-7 text-[22px] xs:body3"
              classNamePrefix="select"
              isClearable={true}
              placeholder={" 계획 / 후기"}
              options={travelStatusOptions}
              onChange={travelStatusOnChangeHandler}
              styles={ColorStyles}
              value={travelStatus}
              ref={selectInputRef}
            />
          </div>

          <div className="flex w-full  items-center justify-center my-[1%] mr-[5%] ">
            <div className=" sm:text-xl text-base px-[2%] ">
              <button
                className="flex items-center gap-2"
                onClick={() => {
                  setLocations([]);
                  sethashtags([]);
                  setWords("");
                  onClearSelect();
                }}
              >
                <GrPowerReset /> 선택해제
              </button>
            </div>
            <button
              className="button2 w-[20%] p-1 xs:body3  text-white bg-black hover:shadow-lg"
              onClick={() => {
                navigate(
                  `/search?lc=${JSON.stringify(locations)}&ht=${JSON.stringify(
                    hashtags
                  )}&ts=${JSON.stringify(travelStatus)}&ws=${words}`
                );
                filterData();
              }}
            >
              검색
            </button>
          </div>
        </div>
      </div>

      {/* 나올 수 있는 리스트 상태 구분 */}
      {filteredList?.length === 0 ? (
        <p className="min-h-[100vh] pt-16 text-lg">검색결과가 없습니다.</p>
      ) : isLoading ? (
        <div className=" flex justify-between flex-wrap mb-[2%]  w-[85%] md:w-[70%] mt-[3%] ">
          {new Array(12).fill(null).map((_, idx) => (
            <SkeletonTheme baseColor="#202020" highlightColor="#444" key={idx}>
              <div className="  mb-[5%] xl:w-[23%] lg:w-[31%] w-[48%] mr-[2%]">
                <Skeleton className="sm:h-[300px] h-[160px]" />
                <div className="mt-3">
                  <Skeleton className="w-[80%] h-[30px]" />
                  <Skeleton className="w-[30%]  h-[25px]" />
                  <Skeleton className="w-[60%] h-[20px]" />
                </div>
              </div>
            </SkeletonTheme>
          ))}
        </div>
      ) : isError ? (
        <p className="min-h-[1500px]">Error : 데이터를 불러오지 못했습니다.</p>
      ) : (
        <SearchList filteredList={filteredList} />
      )}
    </>
  );
};

export default SearchBox;
