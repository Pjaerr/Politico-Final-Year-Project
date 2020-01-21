import React from "react";

import styles from "./MapProvince.module.scss";
import IProvince from "../../interfaces/IProvince";

type Props = {
  province: IProvince;
  svgPath: string;
  onClick: () => void;
};

const MapProvince = ({ province, svgPath, onClick }: Props) => {
  return (
    <>
      <path
        className={styles.container}
        d={svgPath}
        fill={province.isInParty ? "#10ac84" : "#F8C291"}
        stroke="#0A3D62"
        onClick={onClick}
      />
    </>
  );
};

export default MapProvince;
