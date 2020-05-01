import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TurnCounter from "./TurnCounter";

test("Calls onNextTurnClick() prop when the next turn button is clicked", () => {
  let count = 5;

  render(
    <TurnCounter
      onNextTurnClick={() => {
        count += 5;
      }}
      currentTurn={0}
    />
  );

  const nextTurnButton = screen.getByText(/Make a Decision/i);
  fireEvent.click(nextTurnButton);

  expect(count).toBe(10);
});
