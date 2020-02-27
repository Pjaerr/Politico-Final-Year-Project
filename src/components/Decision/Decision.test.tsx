import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Decision from "./Decision";
import DecisionManager from "../../systems/DecisionManager/DecisionManager";

test("Calls onYes() prop when the yes button is clicked", () => {
  const mockDecisionManager = new DecisionManager();

  let count = 5;

  render(
    <Decision
      decision={mockDecisionManager.getDecision()}
      onNo={() => {}}
      onYes={() => {
        count += 5;
      }}
    />
  );

  const yesButton = screen.getByText(/Yes/i);
  fireEvent.click(yesButton);

  expect(count).toBe(10);
});

test("Calls onNo() prop when the no button is clicked", () => {
  const mockDecisionManager = new DecisionManager();

  let count = 5;

  render(
    <Decision
      decision={mockDecisionManager.getDecision()}
      onNo={() => {
        count += 5;
      }}
      onYes={() => {}}
    />
  );

  const noButton = screen.getByText(/No/i);
  fireEvent.click(noButton);

  expect(count).toBe(10);
});
