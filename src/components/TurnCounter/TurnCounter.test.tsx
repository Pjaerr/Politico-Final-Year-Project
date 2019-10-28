import React from "react";
import { mount } from "enzyme";

import TurnCounter from "./TurnCounter";

describe("Creating a <TurnCounter/> component and passing it a currentTurn of 5", () => {
  it("should render a container with a child of Current Turn: 5", () => {
    const wrapper = mount(<TurnCounter currentTurn={5} />);

    expect(wrapper.html()).toEqual(
      '<div class="container">Current Turn: 5</div>'
    );
    wrapper.unmount();
  });
});
