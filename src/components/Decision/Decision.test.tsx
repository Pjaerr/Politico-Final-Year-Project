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
      onClose={() => {}}
    />
  );

  const yesButton = screen.getByText(/Yes/i, { selector: "button" });
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
      onClose={() => {}}
    />
  );

  const noButton = screen.getByText(/No/i, { selector: "button" });
  fireEvent.click(noButton);

  expect(count).toBe(10);
});
