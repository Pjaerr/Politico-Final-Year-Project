import React from "react";

//Components
import PanAndZoomSVG from "../PanAndZoomSVG/PanAndZoomSVG";
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
    <PanAndZoomSVG zoomSpeed={1}>
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
    </PanAndZoomSVG>
  );
};

export default MapContainer;
