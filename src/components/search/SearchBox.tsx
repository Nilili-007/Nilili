import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import SearchList from "./SearchList";
import { hashTagOptions } from "../post/PostHashTag";
import { regionOptions } from "../post/PostCategories";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { MultiStyles, SingleStyles } from "../shared";
import { GrPowerReset } from "react-icons/gr";
import { useOption, useFilterData } from "../../hooks";

const travelStatusOptions: any = [
  { value: false, label: "여행 계획" },
  { value: true, label: "여행 후기" },
];

const SearchBox = () => {
  const navigate = useNavigate();
  const [hashtags2, sethashtags2] = useState<optionType[]>([]);

  const [searchParams] = useSearchParams();

  const {
    selectedTags,
    setSelectedTags,
    regions,
    setRegions,
    selectedLabels,
    selectedRegions,
  } = useOption();

  const {
    filterData,
    setTravelStatus,
    setWords,
    travelStatus,
    words,
    trimWords,
    filteredList,
    data,
    isLoading,
    isError,
  } = useFilterData(selectedLabels, selectedRegions);

  const selectInputRef = useRef<any>(null);

  const onClearSelect = () => {
    if (selectInputRef.current) {
      selectInputRef.current.clearValue();
    }
  };

  //셀렉트한 데이터 State에 반영하기
  const locationOnChangeHandler = (data: any) => {
    setRegions(data);
  };

  const hashtagOnChangeHandler = (data: any) => {
    setSelectedTags(data);
  };

  const travelStatusOnChangeHandler = (data: any) => {
    setTravelStatus(data);
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
    setRegions(
      // @ts-ignore
      searchParams.get("lc") === null
        ? emptyArr
        : // @ts-ignore
          JSON.parse(searchParams.get("lc"))
    );

    setSelectedTags(
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

    if (
      searchParams.get("ts") !== "undefined" &&
      searchParams.get("ts") !== "null"
    ) {
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
      <div className="mb-[2%]  w-[85%] md:resp h-auto mx-auto md:mt-[100px]  min-w-[300px]">
        <p className="w-fit mx-auto lg:text-[47px] md:text-[35px] sm:text-[29px] text-2xl font-bold font-eng my-[5%]">
          EXPLORE YOUR PLANS
        </p>
        <div className="w-full flex flex-col gap-3 lg:gap-5 items-center">
          <div className="w-full flex flex-row gap-3 lg:gap-5 justify-between indent-2 items-center">
            <div className="text-lg lg:body2 w-[170px] lg:w-[180px] p-[1%] sm:p-4  xs:body3 text-white bg-black hidden md:flex md:items-center md:h-[50px] lg:h-[60px]">
              지역 검색
            </div>
            <Select
              className="z-50 w-full leading-7 text-[22px] xs:body3"
              classNamePrefix="select"
              options={regionOptions}
              placeholder={"지역명"}
              autoFocus={true}
              isMulti
              isSearchable={false}
              isClearable={true}
              onChange={locationOnChangeHandler}
              value={regions}
              styles={MultiStyles}
            />
          </div>

          <div className="w-full flex flex-row gap-3 lg:gap-5 indent-2 items-center">
            <div className="text-lg lg:body2 w-[170px] lg:w-[180px] p-[1%] sm:p-4  xs:body3 text-white bg-black hidden md:flex md:items-center md:h-[50px] lg:h-[60px]">
              #해시태그
            </div>
            <Select
              className="z-30 w-full  leading-7 text-[22px] xs:body3"
              classNamePrefix="select"
              options={hashTagOptions}
              isMulti
              isSearchable={false}
              isClearable={true}
              placeholder={"#해시태그"}
              onChange={hashtagOnChangeHandler}
              value={selectedTags}
              styles={MultiStyles}
            />
          </div>

          <div className="w-full flex flex-row gap-3 lg:gap-5 indent-2 items-center">
            <div className="text-lg lg:body2 w-[170px] lg:w-[180px] p-[1%] sm:p-4  xs:body3 text-white bg-black hidden md:flex md:items-center md:h-[50px] lg:h-[60px]">
              검색어
            </div>
            <input
              type="search"
              className={
                "z-20 placeholder:sm:text-[20px] placeholder:lg:text-[22px] placeholder:text-[#808080] font-normal indent-4 border border-gray-300 w-full h-[38px] sm:h-[50px] lg:h-[60px] placeholder:text-[14px] xl:py-2 pr-3 xs:pb-1"
              }
              placeholder="검색어를 입력하세요."
              value={words}
              onChange={(event) => setWords(event.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  navigate(
                    `/search?lc=${JSON.stringify(regions)}&ht=${JSON.stringify(
                      selectedTags
                    )}&ts=${JSON.stringify(travelStatus)}&ws=${trimWords}`
                  );
                  filterData();
                }
              }}
            />
          </div>

          <div className="w-full flex flex-row gap-3 lg:gap-5 indent-2 items-center ">
            <div className="text-lg lg:body2 w-[170px] lg:w-[180px] p-[1%] sm:p-4  xs:body3 text-white bg-black hidden md:flex md:items-center md:h-[50px] lg:h-[60px]">
              계획 / 후기
            </div>
            <Select
              className="z-20 w-full text-[20px] xs:body3"
              classNamePrefix="select"
              isClearable={true}
              placeholder={" 계획 / 후기"}
              options={travelStatusOptions}
              onChange={travelStatusOnChangeHandler}
              styles={SingleStyles}
              value={travelStatus}
              ref={selectInputRef}
            />
          </div>

          <div className="flex w-full items-center justify-center my-[1%] sm:gap-12 gap-8">
            <div className="sm:text-xl text-base px-[2%] ">
              <button
                className="flex justify-center items-center gap-2 font-medium text-[16px] sm:text-[18px] md:text-xl w-28 sm:w-36 md:w-44 p-2"
                onClick={() => {
                  setRegions([]);
                  setSelectedTags([]);
                  setWords("");
                  onClearSelect();
                }}
              >
                <GrPowerReset /> 선택해제
              </button>
            </div>
            <button
              className="text-[16px] sm:text-[18px] md:text-xl w-28 sm:w-36 md:w-44 p-2 border-2 border-black text-white bg-black hover:shadow-lg font-medium"
              onClick={() => {
                navigate(
                  `/search?lc=${JSON.stringify(regions)}&ht=${JSON.stringify(
                    selectedTags
                  )}&ts=${JSON.stringify(travelStatus)}&ws=${trimWords}`
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
        <div className=" flex justify-between flex-wrap mb-[2%]  w-[85%] md:resp mt-[3%] ">
          {new Array(12).fill(null).map((_, idx) => (
            <SkeletonTheme baseColor="#202020" highlightColor="#444" key={idx}>
              <div className="  mb-[5%] xl:w-[23%] lg:w-[31%] w-[48%] mr-[2%] sm:pt-[2%]">
                <Skeleton className="sm:h-[300px] h-[150px]" />
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
