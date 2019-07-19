import { IUserDetails, NumericFilters, FiltersTypes } from "../../../../types/index";
import rageFilter from "../../functions/range"

const inCompatibilityRange: NumericFilters = {
    filter: "compatibility_score",
    text: "Compatibility Score",
    min: 1,
    max: 99,
    value: [],
    func: (el: IUserDetails, {in_compatibility_range}: FiltersTypes) => rageFilter(el.compatibility_score, in_compatibility_range.value),
}
 
export default inCompatibilityRange;