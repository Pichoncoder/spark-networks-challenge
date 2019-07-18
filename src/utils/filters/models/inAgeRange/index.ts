import { IUserDetails, NumericFilters } from "../../../../types/index";
import rageFilter from "../../functions/range"

const inAgeRange: NumericFilters = {
    filter: "age",
    text: "Age",
    min: 18,
    max: 95,
    value: [],
    func: (el: IUserDetails) => rageFilter(el.age, inAgeRange.value),
}

export default inAgeRange;