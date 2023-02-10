import React from "react";
import Select from "react-select";
import { optionType } from "../../pages/Post";

const hashTagOptions = [
  { value: "#여자혼자", label: "#여자혼자" },
  { value: "#남자혼자", label: "#남자혼자" },
  { value: "#커플끼리", label: "#커플끼리" },
  { value: "#부부끼리", label: "#부부끼리" },
  { value: "#부모님과", label: "#부모님과" },
  { value: "#반려동물", label: "#반려동물" },
  { value: "#아이들과", label: "#아이들과" },
  { value: "#단체여행", label: "#단체여행" },
];
interface tagProps {
  selectedTags?: optionType[] | null;
  setSelectedTags?: any;
}

const PostHashTag = ({ selectedTags, setSelectedTags }: tagProps) => {
  function handleTagSelect(data: any) {
    setSelectedTags(data);
  }

  return (
    <div className="xs:-mt-5">
      <Select
        options={hashTagOptions}
        placeholder={"#해시태그"}
        value={selectedTags}
        onChange={handleTagSelect}
        isMulti
        isSearchable={true}
        isClearable={true}
      />
    </div>
  );
};

export default PostHashTag;
