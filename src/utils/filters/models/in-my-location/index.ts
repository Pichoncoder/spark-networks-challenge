import { IUserDetails, BooleanFilters } from "../../../../types/index";
import comparisonFilter from "../../functions/comparison"

const inMyLocation: BooleanFilters = {
    filter: "city_name",
    text: "In my Location",
    value: false,
    func: (el: IUserDetails) => comparisonFilter(el.city.name, 'London'),
}

export default inMyLocation;