import { IUserDetails, NumericFilters } from "../../../../types/index";
import rageFilter from "../../functions/range"

const inHeightRange: NumericFilters = {
    filter: "height_in_cm",
    text: "Height",
    min: 135,
    max: 210,
    value: [],
    func: (el: IUserDetails) => rageFilter(el.height_in_cm, inHeightRange.value),
}

export default inHeightRange;
