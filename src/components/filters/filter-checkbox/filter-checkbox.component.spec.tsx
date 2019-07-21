import React from 'react'
import TestRenderer, { create } from 'react-test-renderer';
import FilterCheckbox from './filter-checkbox.component';
import { shallow, mount} from "enzyme";
import FilterModule from '../../../App';

const props: any = { text: "Photo", filter: 'has_photo', handleCheckbox: jest.fn() };

describe('<FilterCheckbox /> spec', () => {
  it('Snapshot:renders the component', () => {
      const container = TestRenderer.create(<FilterCheckbox {...props}></FilterCheckbox>);
      expect(container).toMatchSnapshot();
  }); 

  it('1#Click on checkbox and state update its value', () => {
    const wrapper = shallow(<FilterCheckbox {...props} />)

    wrapper.find('.filter-element__checkbox').simulate('change', {
      target: true,
  });

    expect(wrapper).toMatchSnapshot()
  });

  it('2#Click on checkbox and state update its value to false', () => {
    const wrapper = shallow(<FilterCheckbox {...props} />)
    wrapper.find('input').simulate('change');

    const parent = mount(<FilterModule></FilterModule>);
    console.log(wrapper.state());

   // expect(wrapper.find('.filter-element__checkbox').prop('checked')).toBe(true)
    expect(props.handleCheckbox).toBeCalledWith('has_photo', true);
  });
});