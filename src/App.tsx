import React from "react";
import { Range } from "rc-slider";
import { State, FiltersProperties, IUserDetails, FiltersTypes, IFilterFunctions, IFilterFunction, FilteredData } from "./types";

// Components
import UserDetails from "./components/user-details/user-details.component";
import FilterCheckbox from "./components/filters/filter-checkbox/filter-checkbox.component";

import {
  has_contact,
  has_photo,
  in_age_range,
  in_compatibility_range,
  is_favourite,
  in_height_range,
  in_my_location
} from "./utils/filters/models";
import "rc-slider/assets/index.css";
import "./styles.scss";

export default class FilterModule extends React.Component {
  state: State = {
    data: [],
    filtered_data: [],
    filters: {
      has_photo,
      is_favourite,
      has_contact,
      in_my_location,
      in_compatibility_range,
      in_age_range,
      in_height_range,
    }
  };

  componentDidMount() {
    this.fetchMatches();
  }

  fetchMatches() {
    fetch("/api/v1/matches")
      .then(res => res.json())
      .then(res => this.setState({ data: res.matches, filtered_data: res.matches }),
        (err) => {
          console.error(err);
        });
  }

  handleCheckbox(filter: string, value: string | boolean | number[]) {
    this.handleFilters(filter, value);
  }

  handleRange(filter: string, value: string | boolean | number[]) {
    this.handleFilters(filter, value);
  }

  handleFilters(filter: string, value: any) {
    const { filters }: State = this.state;
    const hasRangeChanged = (prev: number[]) => value[0] > prev[0] || value[1] < prev[1];

    let prevValues: number[];

    switch (filter) {
      case FiltersProperties.has_photo:
        this.setState((state: State) => {
          return {
            ...state,
            filters: {
              ...state.filters,
              has_photo: {
                ...state.filters.has_photo,
                value: value
              }
            },
          };
        }, () => this.checkFilters(value, filters.has_photo.func));
        break;

      case FiltersProperties.has_contact:
        this.setState((state: State) => {
          return {
            ...state,
            filters: {
              ...state.filters,
              has_contact: {
                ...state.filters.has_contact,
                value: value
              }
            },
          };
        }, () => this.checkFilters(value, filters.has_contact.func));
        break;

      case FiltersProperties.is_favourite:
        this.setState((state: State) => {
          return {
            ...state,
            filters: {
              ...state.filters,
              is_favourite: {
                ...state.filters.is_favourite,
                value: value
              }
            },
          };
        }, () => this.checkFilters(value, filters.is_favourite.func));
        break;

      case FiltersProperties.in_age_range:
        this.setState((state: State) => {
          [...prevValues] = state.filters.in_age_range.value;

          return {
            ...state,
            filters: {
              ...state.filters,
              in_age_range: {
                ...state.filters.in_age_range,
                value: value
              }
            },
          };
        }, () => this.checkFilters(hasRangeChanged(prevValues), filters.in_age_range.func));
        break;
      case FiltersProperties.in_compatibility_range:
        this.setState((state: State) => {
          [...prevValues] = state.filters.in_compatibility_range.value;

          return {
            ...state,
            filters: {
              ...state.filters,
              in_compatibility_range: {
                ...state.filters.in_compatibility_range,
                value: value
              }
            },
          };
        }, () => this.checkFilters(hasRangeChanged(prevValues), filters.in_compatibility_range.func));
        break;
    }
  }

  checkFilters(value: boolean, filterFunction: IFilterFunction) {
    const { filtered_data, data }: State = this.state;

    this.getFilteredData(
      value,
      (value) ? filtered_data : data,
      filterFunction,
      (new_filtered_data: FilteredData) => this.saveFilteredState(new_filtered_data));
  }

  getFilteredData(value: string | boolean | number[], src_data: FilteredData, filterFunction: IFilterFunction, cb: Function) {
    let ff: IFilterFunctions[] = (value) ? [filterFunction] as Array<IFilterFunctions> : this.getActiveFilters();

    return cb(this.applyFilters(src_data, ff, ff.length - 1));
  }

  getActiveFilters(): IFilterFunctions[] {
    const { ...filterTypes }: any = this.state.filters;
    const filterFunctions: IFilterFunctions[] = [];

    Object.keys(filterTypes).forEach((props) => {
      let { value, func } = filterTypes[props];

      if (value && value.length !== 0) { //improve this
        filterFunctions.push(func);
      }
    });

    return filterFunctions;
  }

  applyFilters(data: FilteredData, filterFunc: IFilterFunctions[], index: number): FilteredData {
    //const ff: IFilterFunction = filterFunc.pop();

    if (index >= 0) { // -1 stop
      return this.applyFilters(data.filter((el: IUserDetails) => filterFunc[index](el)), filterFunc, index - 1);
    } else {
      return data;
    }
  }

  saveFilteredState(data: FilteredData) {
    this.setState((state) => {
      return {
        ...state,
        filtered_data: data
      };
    });
  }

  render() {
    const { in_age_range, has_contact, is_favourite, has_photo } = this.state.filters;
    return (
      <main>
        <header></header>
        <aside>
          <FilterCheckbox filter={has_contact.filter}
            handleCheckbox={(e: any, filter: string) => this.handleCheckbox(filter, e)}
            text={has_contact.text}>
          </FilterCheckbox>
          <FilterCheckbox filter={has_photo.filter}
            handleCheckbox={(e: any, filter: string) => this.handleCheckbox(filter, e)}
            text={has_photo.text}>
          </FilterCheckbox>
          <FilterCheckbox filter={is_favourite.filter}
            handleCheckbox={(e: any, filter: string) => this.handleCheckbox(filter, e)}
            text={is_favourite.text}>
          </FilterCheckbox>
          <br></br>
          <label>{in_age_range.text}
            <Range min={in_age_range.min}
              max={in_age_range.max}
              defaultValue={[in_age_range.min, in_age_range.max]}
              onChange={(value) => this.handleRange(in_age_range.filter, value)} />
            <small>{in_age_range.value[0]} - {in_age_range.value[1]}</small>
          </label>

        </aside>
        <div className="results-wrapper">
          {this.state.filtered_data.map((match, index) => {
            return <UserDetails details={match} key={index}></UserDetails>;
          })}
        </div>
      </main>
    );
  }
}