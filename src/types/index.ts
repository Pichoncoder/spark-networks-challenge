import { Data, Matches, Match } from "../../common/interfaces";

export enum FiltersProperties  {
    has_photo = "main_photo",
    has_contact = "contacts_exchanged",
    is_favourite = "favourite",
    in_compatibility_range = "compatibility_score",
    in_age_range = "age",
    in_height_range = "height_in_cm",
    in_my_location = "city_name",
  }

export interface FiltersTypes  {
    has_photo: BooleanFilters;
    is_favourite: BooleanFilters;
    has_contact: BooleanFilters;
    in_compatibility_range: NumericFilters;
    in_height_range: NumericFilters;
    in_age_range: NumericFilters;
    in_my_location: StringFilters;
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

export type NumericFilters = {
    filter: string;
    text: string;
    min: number;
    max: number;
    value: Array<number>;
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

export interface IFilterCheckboxProps  {
    handleCheckbox: (e: any, filter: string) => void;
    filter: string;
    text: string;
}

export interface IFilterRangeProps  {
    handleRange: (e: any, filter: string) => void;
    min: number;
    max: number;
    filter: string;
    text: string;
    value: number[];
}

