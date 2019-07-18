import React from "react";
import { State, FiltersProperties, IUserDetails, FiltersTypes, IFilterFunctions, IFilterFunction, FilteredData} from "./types";
import "./styles.scss";
import UserDetails from "./components/user-details/user-details.component";
import FilterCheckbox from "./components/filters/filter-checkbox/filter-checkbox.component";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import {
  has_contact,
  has_photo,
  in_age_range,
  in_compatibility_range,
  is_favourite,
  in_height_range,
  in_my_location
} from "./utils/filters/models";

export default class FilterModule extends React.Component {
  state: State = {
    data: [],
    filtered_data: [],
    filters : {
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

  handleFilters(filter: string, value: string | boolean | number[]) {
    const { filters }: State = this.state;
  
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
          let prevValues: number[];
          
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
            }, () => this.checkRangeFilters(value as Array<number>, prevValues as Array<number>, filters.in_age_range.func));
      break;
    }
  }

  private checkFilters(value: string | number[] | boolean, filterFunction: IFilterFunction) {
    const { filtered_data, data }: State = this.state;

    if (value) {
      this.applyFilters(filtered_data, [filterFunction] as Array<IFilterFunctions>, 0);
    }
    else {
      const filterFunctions = this.getActiveFilters();

      this.applyFilters(data, filterFunctions, filterFunctions.length - 1);
    }
  }

  private checkRangeFilters(value: number[], prev: number[], filterFunction: IFilterFunction) {
    const { filtered_data, data }: State = this.state;

    if (value[0] > prev[0] || value[1] < prev[1]) {
      this.applyFilters(filtered_data, [filterFunction] as Array<IFilterFunctions>, 0);

    } else {
      const filterFunctions = this.getActiveFilters();

      this.applyFilters(data, filterFunctions, filterFunctions.length - 1);
    }
  }

  private getActiveFilters() {
    const {...filterTypes }: any = this.state.filters;
    const filterFunctions: IFilterFunctions[] = [];

        Object.keys(filterTypes).forEach((props) => {
          if (filterTypes[props].value && filterTypes[props].value.lenght) {
            console.log(filterTypes[props].value)
            filterFunctions.push(filterTypes[props].func);
          }
        });

        return filterFunctions;
  }

  applyFilters(data: FilteredData, filterFunc: IFilterFunctions[], lenght: number) {
      if (lenght >= 0) {
        this.applyFilters(data.filter((el: IUserDetails) => filterFunc[lenght](el)), filterFunc, lenght - 1);

      } else {
        this.setState((state) => {
          return {
            ...state,
            filtered_data: data
          };
        });
      }
  }

  applyFilters2(data: FilteredData, filterFunc: IFilterFunctions[], lenght: number): FilteredData {
    if (lenght >= 0) {
      this.applyFilters(data.filter((el: IUserDetails) => filterFunc[lenght](el)), filterFunc, lenght - 1);
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

render () {
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
            <label>{ in_age_range.text }
            <Range min={in_age_range.min}
                   max={in_age_range.max}
                   defaultValue={[in_age_range.min, in_age_range.max]}
                   onChange={(value) => this.handleRange(in_age_range.filter, value)} />
                  <small>{ in_age_range.value[0] } - { in_age_range.value[1] }</small>
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