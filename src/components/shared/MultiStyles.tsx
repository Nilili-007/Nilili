import { StylesConfig } from "react-select";

const MultiStyles: StylesConfig<optionType, true> = {
  control: (styles) => ({
    ...styles,
    borderRadius: 0,
    "@media (min-width:1024px)": {
      fontSize: 22,
      lineHeight: "54px",
    },
    "@media (max-width:1024px)": {
      fontSize: 20,
      lineHeight: "46px",
    },
    "@media (max-width: 414px)": {
      fontSize: 14,
      lineHeight: "28px",
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
      "@media (min-width:640px)": {
        fontSize: 18,
        lineHeight: 2,
      },
      "@media (max-width: 414px)": {
        fontSize: 12,
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
    "@media (min-width:1280px)": {
      fontSize: 20,
      padding: "0px 15px 0px 20px",
      lineHeight: 2.5,
    },
    "@media (min-width:640px)": {
      fontSize: 16,
      lineHeight: 2,
    },
    "@media (max-width: 414px)": {
      fontSize: 12,
    },
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "#ffffff",
    width: 24,
    ":hover": {
      color: "#f95c54",
    },
  }),
};

export default MultiStyles;
