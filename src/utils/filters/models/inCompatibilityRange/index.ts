import { IUserDetails, NumericFilters } from "../../../../types/index";
import rageFilter from "../../functions/range"

const inCompatibilityRange: NumericFilters = {
    filter: "compatibility_score",
    text: "Compatibility Score",
    min: 1.0,
    max: 99.0,
    value: [],
    func: (el: IUserDetails) => rageFilter(el.compatibility_score, inCompatibilityRange.value),
}

export default inCompatibilityRange;