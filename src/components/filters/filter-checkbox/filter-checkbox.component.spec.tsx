import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TestRenderer, { create } from 'react-test-renderer';
import FilterCheckbox from './filter-checkbox.component';
import { shallow } from "enzyme";

describe('<FilterCheckbox /> spec', () => {
  it('Snapshot:renders the component', () => {
    const props = { text: "Photo", filter: 'has_photo', handleCheckbox: (value: boolean) => { return; } };

      const container = TestRenderer.create(<FilterCheckbox {...props}></FilterCheckbox>);
      expect(container).toMatchSnapshot();
  });

  test.skip('render description filter', () => {
    const props = { text: "Photo", filter: 'has_photo', handleCheckbox: (value: boolean) => { return; } };

    const wrapper = shallow(
      <FilterCheckbox text= {"Photo"} filter={'has_photo'} handleCheckbox={ (value: boolean) => { return; } }/>
    );
    //expect(wrapper.equals()).toBeTruthy();

  });
});