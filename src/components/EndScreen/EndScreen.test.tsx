import React from "react";
import { mount } from "enzyme";

import EndScreen from "./EndScreen";

describe("Creating an <EndScreen/> component and passing it a statistics prop", () => {
  it("should render a an unordered list with the attributes passed to it", () => {
    const wrapper = mount(
      <EndScreen
        playerHasWon={true}
        exitFunc={() => {}}
        statistics={{
          numberOfDecisions: 10,
          attributes: {
            financial: 100,
            populationHappiness: 20,
            domesticPoliticalFavour: 100,
            foreignPoliticalFavour: 100
          }
        }}
      />
    );

    expect(wrapper.find(".financialAttribute").html()).toBe(
      '<li class="financialAttribute"><b>Financial</b>: 100</li>'
    );

    expect(wrapper.find(".populationHappinessAttribute").html()).toBe(
      '<li class="populationHappinessAttribute"><b>Population Happiness</b>: 20</li>'
    );

    expect(wrapper.find(".domesticPoliticalFavourAttribute").html()).toBe(
      '<li class="domesticPoliticalFavourAttribute"><b>Domestic Political Favour</b>: 100</li>'
    );

    expect(wrapper.find(".foreignPoliticalFavourAttribute").html()).toBe(
      '<li class="foreignPoliticalFavourAttribute"><b>Foreign Political Favour</b>: 100</li>'
    );

    wrapper.unmount();
  });
});

describe("Creating an <EndScreen/> component and passing it an exitFunc function", () => {
  it("should call the function we passed when the exit button is clicked", () => {
    let value = 10;

    const wrapper = mount(
      <EndScreen
        playerHasWon={true}
        exitFunc={() => {
          value += 5;
        }}
        statistics={{
          numberOfDecisions: 10,
          attributes: {
            financial: 100,
            populationHappiness: 100,
            domesticPoliticalFavour: 100,
            foreignPoliticalFavour: 100
          }
        }}
      />
    );

    wrapper.find("button").simulate("click");

    expect(value).toEqual(15);

    wrapper.unmount();
  });
});
