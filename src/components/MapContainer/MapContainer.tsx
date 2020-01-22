import React, { useEffect, useState } from "react";

//Components
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
  const svgRef = React.createRef<SVGSVGElement>();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (svgRef.current) {
      const svgBoundingBox = svgRef.current.getBBox();
      setWidth(svgBoundingBox.x + svgBoundingBox.width + svgBoundingBox.x);
      setHeight(svgBoundingBox.y + svgBoundingBox.height + svgBoundingBox.y);
    }
  }, [svgRef]);

  return (
    <svg
      className={styles.container}
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
    >
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
  );
};

export default MapContainer;
