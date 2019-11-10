import React from "react";

import styles from "./EndScreen.module.scss";

type Props = {
  playerHasWon: boolean;
  statistics: {
    numberOfDecisions: number;
    highestRatedAttribute: string;
    lowestRatedAttribute: string;
  };
  exitFunc: Function;
};

const EndScreen = ({ playerHasWon, statistics, exitFunc }: Props) => {
  return (
    <section className={styles.container}>
      <h1>You {playerHasWon ? "Win" : "Lose"}!</h1>
      <p className={styles.conclusionText}>
        {playerHasWon ? (
          <>
            You managed to balance all of your attributes and survived 8 years
            as Prime Minister
          </>
        ) : (
          <>
            You failed to keep your <b>{statistics.lowestRatedAttribute}</b>{" "}
            above 0
          </>
        )}
      </p>
      <p className={styles.numberOfDecisions}>
        You made <b>{statistics.numberOfDecisions}</b> decisions
      </p>
      <p className={styles.highestRatedAttribute}>
        Your highest rated attribute was{" "}
        <b>{statistics.highestRatedAttribute}</b>
      </p>
      {playerHasWon && (
        <p className={styles.lowestRatedAttribute}>
          Your lowest rated attribute was{" "}
          <b>{statistics.lowestRatedAttribute}</b>
        </p>
      )}
      <button className={styles.exitButton} onClick={() => exitFunc()}>
        Exit
      </button>
    </section>
  );
};

export default EndScreen;
