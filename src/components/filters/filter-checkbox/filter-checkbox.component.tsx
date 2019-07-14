import React, { ChangeEvent } from "react";
import { FilterCheckboxProps, IUserDetails, FilteredData } from "../../../types/index";
const FilterCheckbox: React.FC<FilterCheckboxProps> = (props: FilterCheckboxProps) => {
    const { handleCheckbox, text, filter } = props;

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
       handleCheckbox(e.target.checked, filter);
    };

  return (
    <label> {text}
    <input
      type="checkbox"
      onChange={handleOnChange}
    />
  </label>
  );
};

export default FilterCheckbox;