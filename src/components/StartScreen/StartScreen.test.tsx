import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import StartScreen from "./StartScreen";

test("Shows a continue button when passing a showContinueButton prop of true", () => {
  render(
    <StartScreen
      continueFunc={() => {}}
      startFunc={() => {}}
      showContinueButton={true}
    />
  );

  const continueButton = screen.queryByText(/Continue/i);
  expect(continueButton).toBeDefined();
  expect(continueButton).toBeInTheDocument();
});

test("Doesn't show a continue button when passing a showContinueButton prop of false", () => {
  render(
    <StartScreen
      continueFunc={() => {}}
      startFunc={() => {}}
      showContinueButton={false}
    />
  );

  const continueButton = screen.queryByText(/Continue/i);
  expect(continueButton).toBeNull();
});

test("Calls startFunc() prop when the new game button is clicked", () => {
  let count = 5;

  render(
    <StartScreen
      continueFunc={() => {}}
      startFunc={() => (count += 5)}
      showContinueButton={false}
    />
  );

  const newGameButton = screen.getByText(/New Game/i);
  fireEvent.click(newGameButton);

  expect(count).toBe(10);
});

test("Calls continueFunc() prop when the continue button is clicked", () => {
  let count = 5;

  render(
    <StartScreen
      continueFunc={() => {
        count += 5;
      }}
      startFunc={() => {}}
      showContinueButton={true}
    />
  );

  const continueButton = screen.getByText(/Continue/i);
  fireEvent.click(continueButton);

  expect(count).toBe(10);
});
