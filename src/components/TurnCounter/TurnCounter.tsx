import React from "react";

import styles from "./TurnCounter.module.scss";

type Props = {
  currentTurn: number;
  onNextTurnClick: () => void;
};

const TurnCounter = ({ currentTurn, onNextTurnClick }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.turnCount}>Current Turn: {currentTurn}</div>
      <button className={styles.button} onClick={onNextTurnClick}>
        Next Turn
      </button>
    </div>
  );
};

export default TurnCounter;
