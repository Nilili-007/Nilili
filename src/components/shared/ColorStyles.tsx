import { StylesConfig } from "react-select";

const ColorStyles: StylesConfig<optionType, true> = {
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
    "@media (max-width: 414px)": {
      fontSize: 12,
    },
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

export default ColorStyles;
