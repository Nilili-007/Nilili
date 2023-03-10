import { useState } from "react";

const useOption = () => {
  const [regions, setRegions] = useState<optionType[]>([]);
  const [selectedTags, setSelectedTags] = useState<optionType[] | null>([]);

  //selectedTags는 오브젝트 배열입니다.
  //hashtag는 데이터베이스에 문자열 배열로 들어가야 하기 때문에, value 값만 추출하여 문자열배열로 바꿉니다.
  const selectedLabels = selectedTags?.map((tag) => tag.label);
  const selectedRegions = regions?.map((region: optionType) => region.value);
  return {
    selectedTags,
    setSelectedTags,
    regions,
    setRegions,
    selectedLabels,
    selectedRegions,
  };
};

export default useOption;
