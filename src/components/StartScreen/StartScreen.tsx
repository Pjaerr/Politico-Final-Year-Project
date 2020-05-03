import React, { useState } from "react";

import HowToPlay from "../HowToPlay/HowToPlay";

import styles from "./StartScreen.module.scss";

type Props = {
  showContinueButton: boolean;
  continueFunc: Function;
  startFunc: Function;
};

const StartScreen = ({
  showContinueButton,
  continueFunc,
  startFunc,
}: Props) => {
  const [howToPlayIsActive, setHowToPlayIsActive] = useState(false);

  return (
    <>
      {howToPlayIsActive && (
        <HowToPlay onCloseFunc={() => setHowToPlayIsActive(false)} />
      )}

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

        <button
          className={styles.howToPlayButton}
          onClick={() => setHowToPlayIsActive(true)}
        >
          How to play?
        </button>
      </main>
    </>
  );
};

export default StartScreen;
