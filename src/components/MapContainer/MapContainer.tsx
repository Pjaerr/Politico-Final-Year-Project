import React, { useEffect, useState } from "react";

//Components
import MapProvince from "../MapProvince/MapProvince";

//Data
import Provinces from "../../data/Provinces";

//Styles
import styles from "./MapContainer.module.scss";
import IProvince from "../../interfaces/IProvince";

type Props = {
  onProvinceClick: (provinceName: string) => void;
};

const MapContainer = ({ onProvinceClick }: Props) => {
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
      {Provinces.map(province => (
        <MapProvince
          key={province.name}
          svgPath={province.svgPath}
          onClick={() => {
            onProvinceClick(province.name);
          }}
        />
      ))}
    </svg>
  );
};

export default MapContainer;
