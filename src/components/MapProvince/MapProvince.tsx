import React from "react";

import styles from "./MapProvince.module.scss";

type Props = {
  svgPath: string;
  onClick: () => void;
};

const MapProvince = ({ svgPath, onClick }: Props) => {
  return (
    <path
      className={styles.container}
      d={svgPath}
      fill="#F8C291"
      stroke="#0A3D62"
      onClick={onClick}
    />
  );
};

export default MapProvince;
