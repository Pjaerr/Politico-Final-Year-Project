import React, {
  useEffect,
  useRef,
  FunctionComponent,
  ReactElement
} from "react";

import styles from "./PannableSVG.module.scss";

type Props = {
  maxZoomDistance?: number;
  panSpeed?: number;
  zoomSpeed?: number;
};

const PannableSVG: FunctionComponent<Props> = ({
  maxZoomDistance = 1700,
  panSpeed = 0.03,
  zoomSpeed = 0.03,
  children
}) => {
  let svgRef = useRef<SVGSVGElement>(null);
  const svgElement = React.Children.only(children);

  const updateSVGViewBox = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    if (svgRef && svgRef.current) {
      svgRef.current.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
    }
  };

  useEffect(() => {
    let SVGAttributes = {
      position: { x: 0, y: 0 },
      dimensions: { width: 0, height: 0 }
    };

    let isDragActive = false;
    let mousePosOnLastClick: { x: number; y: number };

    if (svgRef && svgRef.current) {
      //Set PannableSVG styles
      svgRef.current.classList.add(styles.container);

      //Resize SVG to fit contents inside
      const svgBoundingBox = svgRef.current.getBBox();

      SVGAttributes.dimensions.width =
        svgBoundingBox.x + svgBoundingBox.width + svgBoundingBox.x;
      SVGAttributes.dimensions.height =
        svgBoundingBox.y + svgBoundingBox.height + svgBoundingBox.y;

      updateSVGViewBox(
        SVGAttributes.position.x,
        SVGAttributes.position.y,
        SVGAttributes.dimensions.width,
        SVGAttributes.dimensions.height
      );

      //Register current mouse position when the map is clicked and enable dragging when mouse is moved
      svgRef.current.addEventListener("mousedown", e => {
        mousePosOnLastClick = {
          x: e.clientX,
          y: e.clientY
        };

        isDragActive = true;
      });

      //When the mouse is released, stop dragging.
      svgRef.current.addEventListener("mouseup", e => {
        isDragActive = false;
      });

      //When the mouse is moved whilst the click is being held down
      //Set the distance to move to be the last known mouse position when it
      //was clicked and the current mouse position being moved.
      svgRef.current.addEventListener("mousemove", e => {
        if (isDragActive) {
          let distanceToMove = { x: 0, y: 0 };

          distanceToMove.x = (mousePosOnLastClick.x - e.clientX) * panSpeed;
          distanceToMove.y = (mousePosOnLastClick.y - e.clientY) * panSpeed;

          if (svgRef.current) {
            SVGAttributes.position.x += distanceToMove.x;
            SVGAttributes.position.y += distanceToMove.y;

            updateSVGViewBox(
              SVGAttributes.position.x,
              SVGAttributes.position.y,
              SVGAttributes.dimensions.width,
              SVGAttributes.dimensions.height
            );
          }
        }
      });

      svgRef.current.addEventListener("mouseleave", e => {
        isDragActive = false;
      });

      svgRef.current.addEventListener("wheel", e => {
        if (svgRef.current) {
          const newWidth =
            SVGAttributes.dimensions.width + e.deltaY * zoomSpeed;
          const newHeight =
            SVGAttributes.dimensions.height + e.deltaY * zoomSpeed;

          if (
            newWidth > 0 &&
            newHeight > 0 &&
            newWidth < maxZoomDistance &&
            newHeight < maxZoomDistance
          ) {
            SVGAttributes.dimensions.width = newWidth;
            SVGAttributes.dimensions.height = newHeight;

            updateSVGViewBox(
              SVGAttributes.position.x,
              SVGAttributes.position.y,
              SVGAttributes.dimensions.width,
              SVGAttributes.dimensions.height
            );
          }
        }
      });
    }
  }, [svgRef]);

  return React.cloneElement(svgElement as ReactElement, {
    ref: svgRef
  });
};

export default PannableSVG;
