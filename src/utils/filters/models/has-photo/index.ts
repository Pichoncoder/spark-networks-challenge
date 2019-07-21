import { IUserDetails, BooleanFilters } from "../../../../types/index";
import propertyFilter from "../../functions/property";

const hasPhoto: BooleanFilters = {
    filter: "main_photo",
    text: "Has Photo",
    value: false,
    func: (el: IUserDetails) => propertyFilter(el.main_photo),
};

export default hasPhoto;