import React from "react";

import { IDecision } from "../../interfaces/IDecision";
import Decision from "../Decision/Decision";
import IAttributes from "../../interfaces/IAttributes";

type Props = {
  decision: IDecision;
  nextTurn: (attributeAdjustments: IAttributes) => void;
};

/**
 * Eventually down the line, before sending back the attribute adjustments, it will
 * actually call out to external functionality that will figure out what exactly those
 * adjustments need to be. For now it is random.
 */
const DecisionContainer = ({ decision, nextTurn }: Props) => {
  return (
    <Decision
      decision={decision}
      onYes={() => {
        nextTurn(decision.positiveModifiers);
      }}
      onNo={() => {
        nextTurn(decision.negativeModifiers);
      }}
    />
  );
};

export default DecisionContainer;
