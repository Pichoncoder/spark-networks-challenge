import { configure } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import 'whatwg-fetch';

configure({ adapter: new React16Adapter() });