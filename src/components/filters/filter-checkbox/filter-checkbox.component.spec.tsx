import React from "react";
import TestRenderer, { create } from "react-test-renderer";
import FilterCheckbox from "./filter-checkbox.component";
import { shallow, mount } from "enzyme";
import FilterModule from "../../../App";

const props: any = { text: "Photo", filter: "main_photo", handleCheckbox: jest.fn() };

describe("<FilterCheckbox /> spec", () => {
  let wrapper: any;
  let component: any;

  beforeEach(() => {
    wrapper = shallow(<FilterCheckbox {...props} />);
    component = create(<FilterCheckbox {...props} />);
  });

  it("Snapshot:renders the component", () => {
      const container = TestRenderer.create(<FilterCheckbox {...props}></FilterCheckbox>);
      expect(container).toMatchSnapshot();
  });

  it("1#Click on checkbox and state update its value", () => {
    wrapper.find(".filter-element__checkbox").simulate("change", {
      target: true,
  });

    expect(wrapper).toMatchSnapshot();
  });

  it("2#Check if props are being pass correctly", () => {
    wrapper.find("input").simulate("change", {
      target: true
    });
    const parent = mount(<FilterModule></FilterModule>);
    const handleOnChange = (e: any, s: any) => true;

    const instance = component.root;
    const checkbox = instance.find(FilterCheckbox);


    expect(checkbox.props.filter).toEqual(props.filter);
    expect(checkbox.props.text).toEqual(props.text);
  });
});