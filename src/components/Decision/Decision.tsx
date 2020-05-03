import React from "react";

import styles from "./Decision.module.scss";
import { IDecision } from "../../interfaces/IDecision";
import { getPoliticalLeaningAsString } from "../../utils/utils";
import Modal from "../Modal/Modal";

type Props = {
  decision: IDecision;
  onYes: () => void;
  onNo: () => void;
  onClose: () => void;
};

const Decision = ({ decision, onYes, onNo, onClose }: Props) => {
  return (
    <Modal title={decision.name} onCloseFunc={onClose}>
      <p>{decision.description}</p>
      <div className={styles.statistics}>
        <p className={styles.statistic}>
          This decision is liked by the{" "}
          <span>
            {getPoliticalLeaningAsString(decision.yes.politicalLeaning)}
          </span>{" "}
          leaning citizens and disliked by the{" "}
          <span>
            {getPoliticalLeaningAsString(decision.no.politicalLeaning)}
          </span>{" "}
          leaning citizens.
        </p>
        <p className={styles.statistic}>
          This decision has a <span>{decision.yes.financialImpact}</span>{" "}
          Financial Impact
        </p>
        <p className={styles.statistic}>
          This decision has a <span>{decision.yes.foreignApproval}</span>{" "}
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
    </Modal>
  );
};

export default Decision;
