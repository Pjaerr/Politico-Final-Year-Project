import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import EndScreen from "./EndScreen";

test("Shows an unordered list containing list of attributes passed in via the statistics prop", () => {
  render(
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

  const financialAttribute = screen.getByText(
    (_, e) => e.textContent === "Financial: 100"
  );
  const populationHappiness = screen.getByText(
    (_, e) => e.textContent === "Population Happiness: 20"
  );
  const domesticPolFavour = screen.getByText(
    (_, e) => e.textContent === "Domestic Political Favour: 100"
  );
  const foreignPolFavour = screen.getByText(
    (_, e) => e.textContent === "Foreign Political Favour: 100"
  );

  expect(financialAttribute).toBeInTheDocument();
  expect(populationHappiness).toBeInTheDocument();
  expect(domesticPolFavour).toBeInTheDocument();
  expect(foreignPolFavour).toBeInTheDocument();
});

test("Calls exitFunc() prop when the exit button is clicked", () => {
  let count = 5;

  render(
    <EndScreen
      playerHasWon={true}
      statistics={{
        numberOfDecisions: 0,
        attributes: {
          financial: 0,
          populationHappiness: 0,
          domesticPoliticalFavour: 0,
          foreignPoliticalFavour: 0
        }
      }}
      exitFunc={() => {
        count += 5;
      }}
    />
  );

  const exitButton = screen.getByText(/Exit/i);
  fireEvent.click(exitButton);

  expect(count).toBe(10);
});
