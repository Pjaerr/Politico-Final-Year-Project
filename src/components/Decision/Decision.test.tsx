import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Decision from "./Decision";
import IDecisionManager from "../../systems/DecisionManager/IDecisionManager";
import DecisionManager from "../../systems/DecisionManager/DecisionManager";
import { FinancialImpact, ForeignApproval } from "../../interfaces/IDecision";

const mockDecisionManager: IDecisionManager = {
  decisionList: [],
  decisions: [],
  getDecision: () => {
    return {
      description: "",
      name: "",
      yes: {
        financialImpact: FinancialImpact.Neutral,
        foreignApproval: ForeignApproval.Neutral,
        politicalLeaning: 0,
      },
      no: {
        financialImpact: FinancialImpact.Neutral,
        foreignApproval: ForeignApproval.Neutral,
        politicalLeaning: 0,
      },
    };
  },
  numberOfDecisions: 10,
  saveDecisionList: () => {},
};

test("Calls onYes() prop when the yes button is clicked", () => {
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
