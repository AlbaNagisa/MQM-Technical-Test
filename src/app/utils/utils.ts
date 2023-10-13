export const selectStyle = {
  container: (baseStyles: any) => ({
    ...baseStyles,
    width: "50%",
    marginLeft: "30px",
  }),
  multiValue: (baseStyles: any) => ({
    ...baseStyles,
    backgroundColor: "#1E2A39",
    fontSize: "16px",
    borderRadius: "10px",
    boxShadow: "none",
    color: "#ffffff",
  }),
  singleValue: (baseStyles: any) => ({
    ...baseStyles,
    color: "#ffffff",
  }),
  option: (baseStyles: any) => ({
    ...baseStyles,
    color: "#ffffff",
    backgroundColor: "#1E2A39",
    ":active": {
      ...baseStyles[":active"],
      color: "#ffffff",
    },
  }),
  multiValueLabel: (baseStyles: any) => ({
    ...baseStyles,
    color: "#ffffff",
  }),
  menu: (baseStyles: any) => ({
    ...baseStyles,
    backgroundColor: "#1E2A39",
  }),
  placeholder(base: any) {
    return {
      ...base,
      color: "#a0aec0",
      fontSize: "16px",
    };
  },
  control: (baseStyles: any) => ({
    ...baseStyles,
    backgroundColor: "#223042",
    border: "none",
    outline: "none",
    fontSize: "16px",
    borderRadius: "10px",
    boxShadow: "none",
  }),
};
