import { Data, Matches, Match } from "../../common/interfaces";

export enum FiltersTexts  {
    hasPhoto = "main_photo",
    hasContact = "contacts_exchanged",
    hasFavourite = "favourite",
    compatibility_score = "compatibility_score",
    age = "age",
    height_in_cm = "height_in_cm",
    city_name = "my_location",
  };

export interface FiltersTypes  {
    hasPhoto: BooleanFilters;
    hasFavourite: BooleanFilters;
    hasContact: BooleanFilters;
    inCompatibilityRange: IntegerFilters;
    inAgeRange: IntegerFilters;
    inHeightRange: IntegerFilters;
    inMyLocation: StringFilters;
}

export interface FilterTypesKey {
    [key: string]: any; // Add index signature
}

export type BooleanFilters = {
    filter: string;
    text: string;
    value: boolean,
     func: (el: IUserDetails) => boolean;
};

export type StringFilters = {
    filter: string;
    text: string;
    value: string,
     func: (el: IUserDetails) => boolean;
};

export type IntegerFilters = {
    filter: string;
    text: string;
    start: number;
    end: number;
    value: number | null;
    func: IFilterFunction;
};

export interface IFilterFunction {
    (el: IUserDetails): boolean;
}

export interface IFilterFunctions extends Array<IFilterFunction> {
    (el: IUserDetails): boolean;
}

export type State = {
    data: FilteredData,
    filtered_data: FilteredData,
    filters: FiltersTypes,
};

export interface FilteredData extends Array<Match> { }

export interface UserProps {
    details: Match;
}

export interface IUserDetails extends Match {}

export interface IFilters {
    main_photo: boolean;
    favourite: false;
    height_in_cm: null;
    compatibility_score: null;
    contacts_exchanged: false;
    age: null;
}

export type IFilteringFunction = {
    (el: IUserDetails | null, filter?: string): boolean | undefined
} | IFilteringFunctionDefault;

export type IFilteringFunctionDefault = {
    (el: IUserDetails | null, filter?: string): false;
};

export interface FilterCheckboxProps  {
    handleCheckbox: (e: any, filter: string) => void;
    filter: string;
    text: string;
}

