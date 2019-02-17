import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import React from "react";

import renderer from "react-test-renderer";
import Counter from "../../../src/components/counter/counter.js";

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.rootDirectory = __dirname;

describe("<Counter />", () => {
  //proof of life test
  it("is alive", () => {
    let component = shallow(<Counter />);
    expect(component.find("span").exists()).toBeTruthy();
  });

  //Asserts state change from the subtract button
  it("subtracts one from count with subtract link", () => {
    let component = mount(<Counter />);
    let aTag = component.find("#negative");
    aTag.simulate("click");
    expect(component.state("count")).toBe(-1);
  });

  //Asserts state change from the add button
  it("adds one to count with add link", () => {
    let component = mount(<Counter />);
    let aTag = component.find("#positive");
    aTag.simulate("click");
    expect(component.state("count")).toBe(1);
  });

  //Assert that state is being transferred to the DOM
  it("renders correctly", () => {
    const tree = renderer.create(<Counter />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Assert DOM stability via snapshot testing
});
