import { IUserDetails, BooleanFilters } from "../../../../types/index";
import propertyFilter from "../../functions/property"

const hasContact: BooleanFilters = {
    filter: "contacts_exchanged",
    text: "In my Contacts",
    value: false,
    func: (el: IUserDetails) => propertyFilter(el.contacts_exchanged),
}

export default hasContact;