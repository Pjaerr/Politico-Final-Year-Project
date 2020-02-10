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
  const groupRef = React.createRef<SVGGElement>();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  let isDragActive = false;

  useEffect(() => {
    if (svgRef.current) {
      const svgBoundingBox = svgRef.current.getBBox();
      setWidth(svgBoundingBox.x + svgBoundingBox.width + svgBoundingBox.x);
      setHeight(svgBoundingBox.y + svgBoundingBox.height + svgBoundingBox.y);

      let currentMousePos: { x: number; y: number };

      svgRef.current.addEventListener("mousedown", e => {
        currentMousePos = {
          x: e.clientX,
          y: e.clientY
        };

        isDragActive = true;
      });
      svgRef.current.addEventListener("mouseup", e => {
        isDragActive = false;
      });
      svgRef.current.addEventListener("mousemove", e => {
        if (isDragActive) {
          let distanceToMove = { x: 0, y: 0 };

          // if (e.clientX < currentMousePos.x) {
          //   //move left
          //   distanceToMove.x -= 2;
          // }
          // if (e.clientX > currentMousePos.x) {
          //   //move right
          //   distanceToMove.x += 2;
          // }

          // if (e.clientY < currentMousePos.y) {
          //   //move down
          //   distanceToMove.y -= 2;
          // }
          // if (e.clientY > currentMousePos.y) {
          //   //move up
          //   distanceToMove.y += 2;
          // }

          distanceToMove.x = (currentMousePos.x - e.clientX) * -0.05;
          distanceToMove.y = (currentMousePos.y - e.clientY) * -0.05;

          if (groupRef.current) {
            pos.x += distanceToMove.x;
            pos.y += distanceToMove.y;
            groupRef.current.setAttribute(
              "transform",
              `translate(${pos.x}, ${pos.y})`
            );
          }
        }
      });
    }
  }, [svgRef]);

  return (
    <svg
      className={styles.container}
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
    >
      <g ref={groupRef}>
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
      </g>
    </svg>
  );
};

export default MapContainer;
