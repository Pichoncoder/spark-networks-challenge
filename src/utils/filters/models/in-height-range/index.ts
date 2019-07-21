import { IUserDetails, NumericFilters, FiltersTypes } from "../../../../types/index";
import rageFilter from "../../functions/range"

const inHeightRange: NumericFilters = {
    filter: "height_in_cm",
    text: "Height(cm)",
    min: 135,
    max: 210,
    value: [],
    func: (el: IUserDetails, { in_height_range }: FiltersTypes) => rageFilter(el.height_in_cm, in_height_range.value),
}

export default inHeightRange;
