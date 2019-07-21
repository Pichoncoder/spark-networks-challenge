import React from "react";
import { IFilterRangeProps } from "../../../types/index";
import { Range } from "rc-slider";

const FilterRange: React.FC<IFilterRangeProps> = (props: IFilterRangeProps) => {
    const { handleRange, text, filter, value, min , max } = props;

    const handleOnChange = (value: number[]) => handleRange(filter, value);

    return (
        <li className="filter-element range-filter">
            <label className="filter-element__text">{text} <small>[{value[0]} - {value[1]}]</small>
                <Range min={min}
                    max={max}
                    defaultValue={[min, max]}
                    onChange={handleOnChange} />
            </label>
        </li>
    );
};

export default FilterRange;