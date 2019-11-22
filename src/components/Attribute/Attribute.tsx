import React from "react";
import ProgressBar from "./ProgressBar";

import styles from "./Attribute.module.scss";

type Props = {
  type: string;
  iconPath: string;
  percentage: number;
};

const Attribute = ({ type, iconPath, percentage }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img src={iconPath} alt={type} />
      </div>
      <ProgressBar percentage={percentage} />
    </div>
  );
};

export default Attribute;
