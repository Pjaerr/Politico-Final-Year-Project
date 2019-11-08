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
    <div className={styles.container}>
      <h1>Politico</h1>
      {showContinueButton && (
        <button
          className={styles.continueButton}
          onClick={() => {
            continueFunc();
          }}
        >
          Continue
        </button>
      )}
      <button
        className={styles.startButton}
        onClick={() => {
          startFunc();
        }}
      >
        Start
      </button>
    </div>
  );
};

export default StartScreen;
