import React, { ChangeEvent } from "react";
import { IFilterCheckboxProps } from "../../../types/index";

const FilterCheckbox: React.FC<IFilterCheckboxProps> = (props: IFilterCheckboxProps) => {
    const { handleCheckbox, text, filter } = props;

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => handleCheckbox(e.target.checked, filter);

  return (
    <li className="filter-element">
      <label> {text}
        <input type="checkbox" onChange={handleOnChange} />
      </label>
    </li>
  );
};

export default FilterCheckbox;