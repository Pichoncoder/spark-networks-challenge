import { IUserDetails, BooleanFilters } from "../../../../types/index";
import propertyFilter from "../../functions/property";

const isFavourite: BooleanFilters = {
    filter: "favourite",
    text: "Favourite",
    value: false,
    func: (el: IUserDetails) => propertyFilter(el.favourite),
};

export default isFavourite;