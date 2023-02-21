import Select from "react-select";

const hashTagOptions = [
  { value: "#가족", label: "#가족" },
  { value: "#친구", label: "#친구" },
  { value: "#연인", label: "#연인" },
  { value: "#아이들과", label: "#아이들과" },
  { value: "#반려동물", label: "#반려동물" },
  { value: "#혼자", label: "#혼자" },
  { value: "#단체", label: "#단체" },
  { value: "#힐링", label: "#힐링" },
  { value: "#데이트", label: "#데이트" },
  { value: "#쇼핑", label: "#쇼핑" },
  { value: "#맛집", label: "#맛집" },
  { value: "#카페", label: "#카페" },
  { value: "#문화생활", label: "#문화생활" },
  { value: "#캠핑", label: "#캠핑" },
  { value: "#섬", label: "#섬" },
  { value: "#역사", label: "#역사" },
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
    <div className="mb-8">
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
