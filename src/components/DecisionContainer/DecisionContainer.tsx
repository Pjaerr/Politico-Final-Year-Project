import React from "react";

import { IDecision } from "../../interfaces/IDecision";
import Decision from "../Decision/Decision";
import IAttributes from "../../interfaces/IAttributes";
/**
 * TODO:
 * Where a component is heavily tied to another part of the application
 * like below through the use of an identical nextTurn function,
 * try and abstract this away so that they both sort of inherit/implement
 * a typescript class/interface so it is clear that they are both linked and
 * cannot really be used as a pure UI component.
 *
 */
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
