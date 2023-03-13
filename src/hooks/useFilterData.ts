import { logEvent } from "../utils/amplitude";
import { useState } from "react";
import {
  useGetCourseQuery,
  useGetCourseConditionallyQuery,
} from "../redux/modules/apiSlice";

const useFilterData = (
  selectedLabels: string[] | undefined,
  selectedRegions: string[] | undefined
) => {
  const [words, setWords] = useState("");
  const [travelStatus, setTravelStatus] = useState<optionType | undefined>();
  const [filteredList, setFilteredList] = useState<CourseType[]>();
  const { data } = useGetCourseQuery();
  const trimWords = words && words.trim();

  const {
    data: conditionData,
    isLoading,
    isError,
  } = useGetCourseConditionallyQuery(travelStatus ? travelStatus.value : "");

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
      trimWords.length === 0 &&
      selectedRegions?.length === 0 &&
      selectedLabels?.length === 0 &&
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
        ?.filter((item) => isSubsetOf(item.location, selectedRegions))
        .filter((item) => isSubsetOf(item.hashtags, selectedLabels))
        .filter(
          (item) =>
            item.nickname?.toLowerCase().includes(trimWords.toLowerCase()) ||
            item.title?.toLowerCase().includes(trimWords.toLowerCase()) ||
            JSON.parse(item.courseList).filter(
              (item: CourseListType) =>
                item.name.toLowerCase().includes(trimWords.toLowerCase()) ||
                item.address.toLowerCase().includes(trimWords.toLowerCase()) ||
                item.road.toLowerCase().includes(trimWords.toLowerCase()) ||
                item.memo?.toLowerCase().includes(trimWords.toLowerCase())
            ).length !== 0
        );
      setFilteredList(filteredData);
    }
    logEvent("게시물 검색", {
      from: "검색페이지",
      filter: {
        해시태그: selectedLabels,
        지역: selectedRegions,
        여행여부: travelStatus,
        검색어: trimWords,
      },
    });
  };
  return {
    filterData,
    setTravelStatus,
    setWords,
    travelStatus,
    words,
    trimWords,
    filteredList,
    data,
    conditionData,
    isLoading,
    isError,
  };
};
export default useFilterData;
