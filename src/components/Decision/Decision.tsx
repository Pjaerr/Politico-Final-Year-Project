import React from "react";

import styles from "./Decision.module.scss";
import { IDecision } from "../../interfaces/IDecision";

type Props = {
  decision: IDecision;
  onYes: () => void;
  onNo: () => void;
};

const Decision = ({ decision, onYes, onNo }: Props) => {
  return (
    <section className={styles.container}>
      <div className={styles.modal}>
        <h1>{decision.name}</h1>
        <p>{decision.description}</p>
        <button className={styles.yesButton} onClick={onYes}>
          Yes
        </button>
        <button className={styles.noButton} onClick={onNo}>
          No
        </button>
      </div>
    </section>
  );
};

export default Decision;
