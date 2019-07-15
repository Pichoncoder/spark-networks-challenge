import React from "react";
import { State, FiltersTexts, IUserDetails, FiltersTypes, IFilterFunctions, IFilterFunction, FilteredData} from "./types";
import "./styles.scss";
import UserDetails from "./components/user-details/user-details.component";
import FilterCheckbox from "./components/filters/filter-checkbox/filter-checkbox.component";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";


interface Props {}

export default class FilterModule extends React.Component<Props> {
  state: State = {
    data: [],
    filtered_data: [],
    filters : {
      hasPhoto: {
        filter: "main_photo",
        text: "Has Photo",
        value: false,
        func: function(el: IUserDetails) {
          return !!el.main_photo;
        },
      },
      hasFavourite: {
        filter: "favourite",
        text: "Favourite",
        value: false,
        func: function(el: IUserDetails) {
          return !!el.favourite;
        }
      },
      hasContact: {
        filter: "contacts_exchanged",
        text: "In contact",
        value: false,
        func: function(el: IUserDetails) {
          return !!el.contacts_exchanged;
        }
      },
      inCompatibilityRange: {
        filter: "compatibility_score",
        text: "Compatibility Score",
        min: 1,
        max: 99,
        value: [],
        func: function(el: IUserDetails)  {
          return el.compatibility_score > this.value[0] &&  el.compatibility_score < this.value[1];
        }
      },
      inAgeRange: {
        filter: "age",
        text: "Age",
        min: 18,
        max: 95,
        value: [],
        func: (el: IUserDetails) => {
          const { value } = this.state.filters.inAgeRange;

          return el.age > value[0] &&  el.age < value[1];
        }
      },
      inHeightRange: {
        filter: "height_in_cm",
        text: "Height",
        min: 135,
        max: 210,
        value: [],
        func: function(el: IUserDetails) {
          return el.height_in_cm > this.value[0] &&  el.age < this.value[1];
        }
      },
      inMyLocation: {
        filter: "city_name",
        text: "distance in km",
        value: '',
        func: function(el: IUserDetails) {
          return el.city.name === this.value;
        }
      }
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
      case FiltersTexts.hasPhoto:
          this.setState((state: State) => {
            return {
              ...state,
              filters: {
                ...state.filters,
                hasPhoto: {
                  ...state.filters.hasPhoto,
                  value: value
                }
              },
            };
          }, () => this.checkFilters(value, filters.hasPhoto.func));
          break;

      case FiltersTexts.hasContact:
          this.setState((state: State) => {
            return {
              ...state,
              filters: {
                ...state.filters,
                hasContact: {
                  ...state.filters.hasContact,
                  value: value
                }
              },
            };
          }, () => this.checkFilters(value, filters.hasContact.func));
        break;

       case FiltersTexts.hasFavourite:
              this.setState((state: State) => {
                return {
                  ...state,
                  filters: {
                    ...state.filters,
                    hasFavourite: {
                      ...state.filters.hasFavourite,
                      value: value
                    }
                  },
                };
              }, () => this.checkFilters(value, filters.hasFavourite.func));
        break;

        case FiltersTexts.inAgeRange:
          let prevValues: number[];
          
            this.setState((state: State) => {
               [...prevValues] = state.filters.inAgeRange.value;

              return {
                ...state,
                filters: {
                  ...state.filters,
                  inAgeRange: {
                    ...state.filters.inAgeRange,
                   value: value
                  }
                },
              };
            }, () => this.checkRangeFilters(value as Array<number>, prevValues as Array<number>, filters.inAgeRange.func));
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
      console.log('USE FILTERED DATA');
    } else {
      const filterFunctions = this.getActiveFilters();
 console.log('USE SOURCE DATA');
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
  const {inAgeRange, hasContact, hasFavourite, hasPhoto } = this.state.filters;
    return (
        <main>
          <header></header>
          <aside>
            <FilterCheckbox filter={hasContact.filter}
                            handleCheckbox={(e: any, filter: string) => this.handleCheckbox(filter, e)}
                            text={hasContact.text}>
            </FilterCheckbox>
            <FilterCheckbox filter={hasPhoto.filter}
                            handleCheckbox={(e: any, filter: string) => this.handleCheckbox(filter, e)}
                            text={hasPhoto.text}>
            </FilterCheckbox>
            <FilterCheckbox filter={hasFavourite.filter}
                            handleCheckbox={(e: any, filter: string) => this.handleCheckbox(filter, e)}
                            text={hasFavourite.text}>
            </FilterCheckbox>
          <br></br>
            <label>{ inAgeRange.text }
            <Range min={inAgeRange.min}
                   max={inAgeRange.max}
                   defaultValue={[inAgeRange.min, inAgeRange.max]}
                   onChange={(value) => this.handleRange(inAgeRange.filter, value)} />
                  <small>{ inAgeRange.value[0] } - { inAgeRange.value[1] }</small>
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