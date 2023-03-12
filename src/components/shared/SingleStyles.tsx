import { StylesConfig } from "react-select";

const SingleStyles: StylesConfig<optionType, true> = {
  control: (styles) => ({
    ...styles,
    borderRadius: 0,
    "@media (min-width:	1024px)": {
      fontSize: 22,
      lineHeight: "41px",
    },
    "@media (max-width:1024px)": {
      fontSize: 20,
      lineHeight: "31px",
    },
    "@media (max-width: 414px)": {
      fontSize: 14,
      lineHeight: "27px",
    },
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#ffffff"
        : isFocused
        ? "#000000"
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? "#ccc"
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
      "@media (min-width:1024px)": {
        fontSize: 20,
        lineHeight: 3,
      },
    };
  },
  input: (styles) => ({ ...styles, ":placeholder": { color: "#808080" } }),
  placeholder: (styles) => ({
    ...styles,
    ":placeholder": { color: "#808080" },
  }),
  singleValue: (styles) => ({
    ...styles,
    fontWeight: 600,
  }),
};

export default SingleStyles;
