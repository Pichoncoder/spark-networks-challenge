import { IUserDetails, StringFilters } from "../../../../types/index";
import propertyFilter from "../../functions/property"

const inMyLocation: StringFilters = {
    filter: "city_name",
    text: "distance in km",
    value: '',
    func: function (el: IUserDetails) {
      return true;
    }
}

export default inMyLocation;