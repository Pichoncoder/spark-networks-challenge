import React, { ChangeEvent } from "react";
import { IFilterCheckboxProps } from "../../../types/index";

const FilterCheckbox: React.FC<IFilterCheckboxProps> = (props: IFilterCheckboxProps) => {
    const { handleCheckbox, text, filter } = props;

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => handleCheckbox(filter, e.target.checked);

  return (
    <li className={"filter-element checkbox-filter " + filter}>
      <label className="filter-element__text"> {text}
        <input id={filter} name={filter} className="filter-element__checkbox" type="checkbox" onChange={handleOnChange} />
      </label>
    </li>
  );
};

export default FilterCheckbox;