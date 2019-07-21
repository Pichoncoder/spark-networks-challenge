import React from 'react';
import ReactDOM from 'react-dom';
import FilterModule from './App';
import FilterCheckbox from "./components/filters/filter-checkbox/filter-checkbox.component";
import FilterRange from "./components/filters/filter-range/filter-range.component";
import UserDetails from "./components/user-details/user-details.component";
import { create } from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { FilteredData } from './types';
import { default as mockedData } from "../common/data/matches.json";

function mockFetch(data: any) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  );
}

describe('FilterModule main component', () => {
  let wrapper: any;
  let component: any;
  let data: FilteredData;

  beforeEach(() => {
    wrapper = shallow(<FilterModule></FilterModule>);
    component = create(<FilterModule />);
    data = mockedData.matches;
  });

  it('#1 renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FilterModule />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('#2 should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('#3 should render a <div />', () => {
    const props: any = { text: "Has Photo", filter: 'main_photo' };

    const handleOnChange = (e: any, s: any) => true;

    const child = mount(<FilterCheckbox {...props} handleCheckbox={(e, s) => handleOnChange(e, s)}></FilterCheckbox>);

    child.find('label > .filter-element__checkbox').simulate('change');

    expect(wrapper.state().filtered_data).toEqual(wrapper.state().data);
  });

  it("#3 Filter module must have a fixed number of instances of range and checkbox", () => {
    const component = create(<FilterModule />);
    const instance = component.root;

    // const checkbox = instance.findByProps({filter: "main_photo", handleCheckbox: (e:any, s:any) => handleCheckbox(e, s),text:"Has Photo"});
    const checkbox = instance.findAllByType(FilterCheckbox);
    const range = instance.findAllByType(FilterRange);

    expect(checkbox).toHaveLength(4);
    expect(range).toHaveLength(3);
  });

  it("#4  Function applyFilters: has photo", () => {
    const { func } = wrapper.state().filters.has_photo;

    const filtered: FilteredData = wrapper.instance().applyFilters(data, [func], 0);

    expect(filtered).not.toHaveLength(data.length);
  });

  it("#5  Function applyFilters: filter with has_photo and has_contact ", () => {
    let ff = [];

    ff.push(wrapper.state().filters.has_photo.func);
    ff.push(wrapper.state().filters.has_contact.func);

    const filtered: FilteredData = wrapper.instance().applyFilters(data, ff, ff.length - 1);

    expect(filtered).not.toHaveLength(data.length);
  });

  it('#6 Active all boolean filters, get number of fitler functions and applied them', () => {
    wrapper.instance().handleFilters('main_photo', true);
    wrapper.instance().handleFilters('contacts_exchanged', true);
    wrapper.instance().handleFilters('favourite', true);
    wrapper.instance().handleFilters('city_name', true);

    expect(wrapper.state().filters.has_photo.value).toBe(true);
    expect(wrapper.state().filters.has_contact.value).toBe(true);
    expect(wrapper.state().filters.is_favourite.value).toBe(true);
    expect(wrapper.state().filters.in_my_location.value).toBe(true);

    const ff = wrapper.instance().getActiveFilters();
    expect(ff).toHaveLength(4);

    const filtered: FilteredData = wrapper.instance().applyFilters(data, ff, ff.length - 1);
    expect(filtered).toHaveLength(1);

    wrapper.instance().getFilteredData(false, data, ff, (new_filtered_data: FilteredData) => {
      expect(new_filtered_data).toHaveLength(1);
    });
  });

  it('#7 Active all range filters, get fitler functions and applied them', () => {
    wrapper.instance().handleFilters('height_in_cm', [140, 190]);
    wrapper.instance().handleFilters('compatibility_score', [50, 99]);
    wrapper.instance().handleFilters('age', [30, 70]);

    expect(wrapper.state().filters.in_height_range.value).toEqual([140, 190]);
    expect(wrapper.state().filters.in_compatibility_range.value).toEqual([.5, .99]);
    expect(wrapper.state().filters.in_age_range.value).toEqual([30, 70]);

    const ff = wrapper.instance().getActiveFilters();
    expect(ff).toHaveLength(3);

    const filtered: FilteredData = wrapper.instance().applyFilters(data, ff, ff.length - 1);
    expect(filtered).toHaveLength(23);

    wrapper.instance().getFilteredData(false, data, ff, (new_filtered_data: FilteredData) => {
      expect(new_filtered_data).toHaveLength(23);
    });
  });

  it('#8 Active diferent filters type,  remove and apply one', () => {
    const { func } = wrapper.state().filters.has_photo;

    wrapper.instance().handleFilters('height_in_cm', [140, 190]);
    wrapper.instance().handleFilters('contacts_exchanged', true);
    wrapper.instance().handleFilters('city_name', true);

    const ff = wrapper.instance().getActiveFilters();
    expect(ff).toHaveLength(3);

    const filtered: FilteredData = wrapper.instance().applyFilters(data, ff, ff.length - 1);
    expect(filtered).toHaveLength(4);

    // apply filter from fitered data
    wrapper.instance().getFilteredData(true, filtered, func, (new_filtered_data: FilteredData) => {
      expect(new_filtered_data).toHaveLength(2);
    });

    // remove filter from src data
    wrapper.instance().getFilteredData(false, data, func, (new_filtered_data: FilteredData) => {
      expect(new_filtered_data).toHaveLength(4);
    });
  });
})