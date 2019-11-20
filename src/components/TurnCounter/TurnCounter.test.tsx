import React from "react";
import { mount } from "enzyme";

import TurnCounter from "./TurnCounter";

//Unit Tests
describe("Creating a <TurnCounter/> component and passing it a currentTurn prop", () => {
  it("should render a div with the text Current Turn: {props.currentTurn}", () => {
    const wrapper = [
      mount(<TurnCounter currentTurn={5} />),
      mount(<TurnCounter currentTurn={19} />)
    ];

    expect(wrapper[0].find("div").text()).toEqual("Current Turn: 5");
    expect(wrapper[1].find("div").text()).toEqual("Current Turn: 19");

    wrapper[0].unmount();
    wrapper[1].unmount();
  });
});
