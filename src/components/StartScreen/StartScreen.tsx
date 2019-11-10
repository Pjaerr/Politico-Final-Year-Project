import React from "react";

import styles from "./StartScreen.module.scss";

type Props = {
  showContinueButton: boolean;
  continueFunc: Function;
  startFunc: Function;
};

const StartScreen = ({
  showContinueButton,
  continueFunc,
  startFunc
}: Props) => {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Politico</h1>
      <div className={styles.buttons}>
        {showContinueButton && (
          <button
            className={styles.continueButton}
            onClick={() => continueFunc()}
          >
            Continue
          </button>
        )}
        <button className={styles.startButton} onClick={() => startFunc()}>
          New Game
        </button>
      </div>
    </main>
  );
};

export default StartScreen;
