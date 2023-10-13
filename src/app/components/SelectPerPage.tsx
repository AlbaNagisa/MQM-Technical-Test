import React from "react";
import SelectC from "./SelectC";

interface Props {
  setSize: (size: number) => void;
  setPage: (page: number) => void;
  size: number;
}

//select for number of results per page
export default function SelectPerPage({ setSize, setPage, size }: Props) {
  return (
    <SelectC
      onChange={(newValue, actionMeta) => {
        if (
          parseInt(newValue.value).toString() != "NaN" &&
          parseInt(newValue.value) <= 99
        ) {
          setSize(parseInt(newValue.value));
          setPage(1);
        }
      }}
      isMulti={false}
      selectedOption={{ value: `${size}`, label: `${size}` }}
      options={[
        { value: "10", label: "10" },
        { value: "20", label: "20" },
        { value: "50", label: "50" },
      ]}
    />
  );
}
