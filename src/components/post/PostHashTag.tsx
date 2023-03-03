import Select, { StylesConfig } from "react-select";

export const hashTagOptions = [
  { value: "화목하게 가족과", label: "#화목하게 가족과" },
  { value: "우정충전 친구와", label: "#우정충전 친구와" },
  { value: "사랑하는 연인과", label: "#사랑하는 연인과" },
  { value: "소중한 아이들과", label: "#소중한 아이들과" },
  { value: "반려동물과 같이", label: "#반려동물과 같이" },
  { value: "조용히 나 혼자", label: "#조용히 나 혼자" },
  { value: "다 함께 단체로", label: "#다 함께 단체로" },
  { value: "일상 속의 힐링", label: "#일상 속의 힐링" },
  { value: "로맨틱한 데이트", label: "#로맨틱한 데이트" },
  { value: "FLEX! 쇼핑", label: "#FLEX! 쇼핑" },
  { value: "나만 알고픈 맛집", label: "#나만 알고픈 맛집" },
  { value: "감성충전 카페", label: "#감성충전 카페" },
  { value: "교양충전 문화생활", label: "#교양충전 문화생활" },
  { value: "떠나봐요 캠핑", label: "#떠나봐요 캠핑" },
  { value: "배타고 섬으로", label: "#배타고 섬으로" },
  { value: "깊은 역사 속으로", label: "#깊은 역사 속으로" },
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

  const colourStyles: StylesConfig<optionType, true> = {
    control: (styles) => ({ ...styles, borderRadius: "0" }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? "#000000"
          : isFocused
          ? "#000000"
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? "#000000"
          : isFocused
          ? "#ffffff"
          : "#000000",
        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? "#000000"
              : "#A0A4A8"
            : undefined,
        },
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: "#000000",
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: "#ffffff",
      paddingLeft: 10,
      fontSize: 16,
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "#ffffff",
      ":hover": {
        // backgroundColor: "#CBCDD2",
        color: "#f95c54",
      },
    }),
  };
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
        styles={colourStyles}
      />
    </div>
  );
};

export default PostHashTag;
