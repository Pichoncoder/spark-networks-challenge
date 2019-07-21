import { IUserDetails, NumericFilters, FiltersTypes } from "../../../../types/index";
import rageFilter from "../../functions/range"

const inAgeRange: NumericFilters = {
    filter: "age",
    text: "Age",
    min: 18,
    max: 95,
    value: [],
    func: (el: IUserDetails, { in_age_range }: FiltersTypes) => rageFilter(el.age, in_age_range.value),
}

export default inAgeRange;