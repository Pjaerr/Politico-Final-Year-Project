import React from "react";

import styles from "./EndScreen.module.scss";
import IAttributes from "../../interfaces/IAttributes";

type Props = {
  playerHasWon: boolean;
  statistics: {
    numberOfDecisions: number;
    attributes: IAttributes;
  };
  exitFunc: Function;
};

const EndScreen = ({ playerHasWon, statistics, exitFunc }: Props) => {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>You {playerHasWon ? "Win" : "Lose"}!</h1>

      <p className={styles.conclusionText}>
        {playerHasWon
          ? "You managed to balance all of your attributes and survived 8 years as Prime Minister"
          : "You failed to keep your nations attributes balanced"}
      </p>

      <p className={styles.numberOfDecisions}>
        You made <b>{statistics.numberOfDecisions}</b> decisions
      </p>

      <ul className={styles.attributes}>
        <li className={styles.financialAttribute}>
          <b>Financial</b>: {statistics.attributes.financial}
        </li>

        <li className={styles.populationHappinessAttribute}>
          <b>Population Happiness</b>:{" "}
          {statistics.attributes.populationHappiness}
        </li>

        <li className={styles.domesticPoliticalFavourAttribute}>
          <b>Domestic Political Favour</b>:{" "}
          {statistics.attributes.domesticPoliticalFavour}
        </li>

        <li className={styles.foreignPoliticalFavourAttribute}>
          <b>Foreign Political Favour</b>:{" "}
          {statistics.attributes.foreignPoliticalFavour}
        </li>
      </ul>

      <div className={styles.buttons}>
        <button className={styles.exitButton} onClick={() => exitFunc()}>
          Exit
        </button>
      </div>
    </main>
  );
};

export default EndScreen;
