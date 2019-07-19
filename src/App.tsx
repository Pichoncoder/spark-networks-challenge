import React from "react";
import { isArray } from "util";
import "./styles.scss";

// Types
import {
  State,
  FiltersProperties,
  IUserDetails,
  IFilterRangeProps,
  FiltersTypes,
  IFilterCheckboxProps,
  IFilterFunctions,
  IFilterFunction,
  FilteredData
} from "./types";

// Components
import UserDetails from "./components/user-details/user-details.component";
import FilterCheckbox from "./components/filters/filter-checkbox/filter-checkbox.component";
import FilterRange from "./components/filters/filter-range/filter-range.component";

// Models
import {
  has_contact,
  has_photo,
  is_favourite,
  in_my_location,
  in_age_range_model,
  in_compatibility_range_model,
  in_height_range_model
} from "./utils/filters/models";

export default class FilterModule extends React.Component {
 
  state: State = {
    data: [],
    filtered_data: [],
    filters: {
      has_photo,
      is_favourite,
      has_contact,
      in_my_location,
      in_compatibility_range: {
        ...in_compatibility_range_model,
        func: (el: IUserDetails) => in_compatibility_range_model.func(el, this.state.filters),
      },
      in_age_range: {
        ...in_age_range_model,
        func: (el: IUserDetails) => in_age_range_model.func(el, this.state.filters),
      },
      in_height_range: {
        ...in_height_range_model,
        func: (el: IUserDetails) => in_height_range_model.func(el, this.state.filters),
      },
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

  handleFilters(filter: string, value: any) {
    const { filters }: State = this.state;

    const hasRangeChanged = (prev: number[], _value: number[]) => _value[0] > prev[0] || _value[1] < prev[1];

    const parseDecimal = (numberVal:number) =>parseFloat((numberVal / 100).toFixed(2));

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
                value
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
                value
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
                value
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
                value
              }
            },
          };
        }, () => this.checkFilters(hasRangeChanged(prevValues, value), filters.in_age_range.func));
        break;
      case FiltersProperties.in_compatibility_range:
          const [min, max] = value;
          const decimalValue: number[] = [parseDecimal(min), parseDecimal(max)];

        this.setState((state: State) => {
          [...prevValues] = state.filters.in_compatibility_range.value;

          return {
            ...state,
            filters: {
              ...state.filters,
              in_compatibility_range: {
                ...state.filters.in_compatibility_range,
                value: decimalValue
              }
            },
          };
        }, () => this.checkFilters(hasRangeChanged(prevValues, decimalValue), filters.in_compatibility_range.func));
        break;
      case FiltersProperties.in_height_range:
        this.setState((state: State) => {
          [...prevValues] = state.filters.in_height_range.value;

          return {
            ...state,
            filters: {
              ...state.filters,
              in_height_range: {
                ...state.filters.in_height_range,
                value
              }
            },
          };
        }, () => this.checkFilters(hasRangeChanged(prevValues, value), filters.in_height_range.func));
        break;
    }
  }

  checkFilters(value: boolean, filterFunction: IFilterFunction) {
    const { filtered_data, data }: State = this.state;
    const src = (value) ? filtered_data : data;

    this.getFilteredData(
      value,
      src,
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

  getFilterCheckbox({ filter, text }: IFilterCheckboxProps, index: number) {
    return <FilterCheckbox
      key={index}
      filter={filter}
      text={text}
      handleCheckbox={(filter: string, value: any) => this.handleFilters(filter, value)}>
    </FilterCheckbox>
  }

  getFilterRange({ filter, text, value, min, max }: IFilterRangeProps, index: number) {
    return <FilterRange
      key={index}
      filter={filter}
      text={text}
      value={value}
      min={min}
      max={max}
      handleRange={(filter: string, value: any) => this.handleFilters(filter, value)}>
    </FilterRange>
  }

  render() {
    const { filters }: any = this.state;

    return (
      <main>
        <header></header>
        <aside>
          <ul>
            {Object.keys(filters).map((type, index) => {
              const { value } = filters[type];

              return (isArray(value)) ? this.getFilterRange(filters[type], index) : this.getFilterCheckbox(filters[type], index);
            })}
          </ul>
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