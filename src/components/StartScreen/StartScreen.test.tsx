import React from "react";
import { mount } from "enzyme";

import StartScreen from "./StartScreen";

describe("Creating a <StartScreen/> component and passing it a showContinueButton prop of false", () => {
  it("should render a container with a child containing only a start button", () => {
    const wrapper = mount(
      <StartScreen
        showContinueButton={false}
        startFunc={() => {}}
        continueFunc={() => {}}
      />
    );

    expect(wrapper.html()).toEqual(
      '<div class="container"><h1>Politico</h1><button class="startButton">Start</button></div>'
    );
    wrapper.unmount();
  });
});

describe("Creating a <StartScreen/> component and passing it a showContinueButton prop of true", () => {
  it("should render a container with a child containing both a start and a continue button", () => {
    const wrapper = mount(
      <StartScreen
        showContinueButton={true}
        startFunc={() => {}}
        continueFunc={() => {}}
      />
    );

    expect(wrapper.html()).toEqual(
      '<div class="container"><h1>Politico</h1><button class="continueButton">Continue</button><button class="startButton">Start</button></div>'
    );
    wrapper.unmount();
  });
});

describe("Creating a <StartScreen/> component and passing it a startFunc that increments a variable", () => {
  it("should, when the start button is clicked, increment the variable we passed in", () => {
    let variable = 0;

    const wrapper = mount(
      <StartScreen
        showContinueButton={false}
        startFunc={() => {
          variable++;
        }}
        continueFunc={() => {}}
      />
    );

    wrapper.find(".startButton").simulate("click");

    expect(variable).toEqual(1);

    wrapper.unmount();
  });
});
