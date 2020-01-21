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
    <>
      <div className={styles.modalOverlay} />
      <section className={styles.container}>
        <div className={styles.modal}>
          <header className={styles.header}>
            <div className={styles.headerTitle}>
              <h1>{decision.name}</h1>
            </div>
          </header>
          <section className={styles.body}>
            <p>{decision.description}</p>
            <div className={styles.statistics}>
              <p className={styles.statistic}>
                This decision is <span>{decision.politicalLeaning}</span>{" "}
                Leaning
              </p>
              <p className={styles.statistic}>
                This decision has a <span>{decision.financialImpact}</span>{" "}
                Financial Impact
              </p>
              <p className={styles.statistic}>
                This decision has <span>{decision.foreignApproval}</span>{" "}
                Foreign Approval
              </p>
            </div>
            <div className={styles.buttons}>
              <button className={styles.yesButton} onClick={onYes}>
                Yes
              </button>
              <button className={styles.noButton} onClick={onNo}>
                No
              </button>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Decision;
