import React, { ChangeEvent } from "react";
import { IFilterRangeProps } from "../../../types/index";
import { Range } from "rc-slider";

const FilterRange: React.FC<IFilterRangeProps> = (props: IFilterRangeProps) => {
    const { handleRange, text, filter, value, min , max } = props;

    const handleOnChange = (value: number[]) => handleRange(filter, value);

    return (
        <li className="filter-element">
            <label>{text}
                <Range min={min}
                    max={max}
                    defaultValue={[min, max]}
                    onChange={handleOnChange} />
                <small>{value[0]} - {value[1]}</small>
            </label>
        </li>
    );
};

export default FilterRange;