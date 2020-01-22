import React from "react";
import PercentageBar from "./PercentageBar";

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
      <PercentageBar percentage={percentage} />
    </div>
  );
};

export default Attribute;
