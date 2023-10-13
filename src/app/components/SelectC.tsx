import React from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import { selectStyle } from "../utils/utils";
interface Props {
  onChange: (newValue: any, actionMeta: any) => void;
  isMulti: boolean;
  selectedOption:
    | MultiValue<{
        value: string;
        label: string;
      }>
    | SingleValue<{
        value: string;
        label: string;
      }>
    | null;
  options: Array<{
    value: string;
    label: string;
  }>;
}
//modular select component
export default function SelectC({
  onChange,
  selectedOption,
  options,
  isMulti,
}: Props) {
  return (
    <Select
      instanceId="select" //pour retirer le warning “Warning: Prop `id` did not match”
      styles={selectStyle}
      isMulti={isMulti}
      defaultValue={selectedOption}
      onChange={(newValue, actionMeta) => onChange(newValue, actionMeta)}
      options={options}
    />
  );
}
