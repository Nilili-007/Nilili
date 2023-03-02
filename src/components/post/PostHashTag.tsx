import Select from "react-select";
import ColorStyles from "../shared/ColorStyles";

export const hashTagOptions = [
  { value: "#가족", label: "#화목하게 가족과" },
  { value: "#친구", label: "#우정충전 친구와" },
  { value: "#연인", label: "#사랑하는 연인과" },
  { value: "#아이들과", label: "#소중한 아이들과" },
  { value: "#반려동물", label: "#반려동물과 같이" },
  { value: "#혼자", label: "#조용히 나 혼자" },
  { value: "#단체", label: "#다 함께 단체로" },
  { value: "#힐링", label: "#일상 속의 힐링" },
  { value: "#데이트", label: "#로맨틱한 데이트" },
  { value: "#쇼핑", label: "#FLEX! 쇼핑" },
  { value: "#맛집", label: "#나만 알고픈 맛집" },
  { value: "#카페", label: "#감성충전 카페" },
  { value: "#문화생활", label: "#교양충전 문화생활" },
  { value: "#캠핑", label: "#떠나봐요 캠핑" },
  { value: "#섬", label: "#배타고 섬으로" },
  { value: "#역사", label: "#깊은 역사 속으로" },
];
interface tagProps {
  selectedTags?: any;
  setSelectedTags?: any;
}

const PostHashTag = ({ selectedTags, setSelectedTags }: tagProps) => {
  function handleTagSelect(data: any) {
    setSelectedTags(data);
  }
  const limit = 5;

  return (
    <div className="mb-8">
      <Select
        isMulti
        placeholder={"#해시태그"}
        options={hashTagOptions}
        onChange={handleTagSelect}
        className="basic-multi-select z-10"
        classNamePrefix="select"
        isSearchable={true}
        value={selectedTags}
        isOptionDisabled={(selectedTag) =>
          selectedTags && selectedTags.length >= limit
        }
        styles={ColorStyles}
      />
    </div>
  );
};

export default PostHashTag;
