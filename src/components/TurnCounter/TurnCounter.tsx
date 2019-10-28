import React from "react";

import styles from "./TurnCounter.module.scss";

type Props = {
  currentTurn: number;
};

const TurnCounter = ({ currentTurn }: Props) => {
  return <div className={styles.container}>Current Turn: {currentTurn}</div>;
};

export default TurnCounter;
