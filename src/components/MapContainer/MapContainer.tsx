import React from "react";

//Components
import PannableSVG from "../PannableSVG/PannableSVG";
import MapProvince from "../MapProvince/MapProvince";

//Styles
import styles from "./MapContainer.module.scss";
import IProvince from "../../interfaces/IProvince";
import { getProvinceSVGPath } from "../../utils/utils";

type Props = {
  provinces: IProvince[];
  onProvinceClick: (provinceName: string) => void;
};

const MapContainer = ({ onProvinceClick, provinces }: Props) => {
  return (
    <PannableSVG zoomSpeed={1}>
      <svg className={styles.container}>
        {provinces.map(province => (
          <MapProvince
            key={province.name}
            province={province}
            svgPath={getProvinceSVGPath(province.name)}
            onClick={() => {
              onProvinceClick(province.name);
            }}
          />
        ))}
      </svg>
    </PannableSVG>
  );
};

export default MapContainer;
