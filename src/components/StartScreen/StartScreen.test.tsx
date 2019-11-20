import React from "react";
import { mount } from "enzyme";

import StartScreen from "./StartScreen";

describe("Creating a <StartScreen/> component and passing it a showContinueButton prop of true", () => {
  it("should render a container with two <button> elements", () => {
    const wrapper = mount(
      <StartScreen
        showContinueButton={true}
        continueFunc={() => {}}
        startFunc={() => {}}
      />
    );

    expect(wrapper.find("button").length).toEqual(2);

    wrapper.unmount();
  });
});

describe("Creating a <StartScreen/> component and passing it a showContinueButton prop of false", () => {
  it("should render a container with a single <button> element", () => {
    const wrapper = mount(
      <StartScreen
        showContinueButton={false}
        continueFunc={() => {}}
        startFunc={() => {}}
      />
    );

    expect(wrapper.find("button").length).toEqual(1);

    wrapper.unmount();
  });
});

describe("Creating a <StartScreen/> component, passing it a startFunc function", () => {
  it("should call the startFunc function when the start button is clicked", () => {
    let value = 5;

    const wrapper = mount(
      <StartScreen
        showContinueButton={false}
        continueFunc={() => {}}
        startFunc={() => {
          value += 10;
        }}
      />
    );

    wrapper.find("button").simulate("click");

    expect(value).toEqual(15);

    wrapper.unmount();
  });
});
