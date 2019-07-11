import { Data, Matches, Match } from "../../common/interfaces";

export enum FiltersType {
    HasPhoto = "default",
  }

export type State = {
    data: FilteredData,
    filtered_data: FilteredData
}

export interface FilteredData extends Array<Match> { }

export interface UserProps {
    details: Match;
}