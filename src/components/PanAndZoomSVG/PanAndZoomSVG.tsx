import React, {
  useEffect,
  useRef,
  FunctionComponent,
  ReactElement
} from "react";

import styles from "./PanAndZoomSVG.module.scss";

type Props = {
  maxZoomDistance?: number;
  zoomSpeed?: number;
};

const PanAndZoomSVG: FunctionComponent<Props> = ({
  maxZoomDistance = 1700,
  zoomSpeed = 1,
  children
}) => {
  let svgRef = useRef<SVGSVGElement>(null);

  const updateSVGViewBox = (x: number, y: number, w: number, h: number) => {
    if (svgRef && svgRef.current) {
      svgRef.current.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
    }
  };

  useEffect(() => {
    let SVGAttributes = {
      position: { x: 0, y: 0 },
      dimensions: { width: 0, height: 0 }
    };

    let isPanActive = false;

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
      svgRef.current.addEventListener(
        "pointerdown",
        () => {
          isPanActive = true;
        },
        false
      );

      //When the mouse is released, stop dragging.
      svgRef.current.addEventListener(
        "pointerup",
        () => {
          isPanActive = false;
        },
        false
      );

      //When the mouse is moved whilst the click is being held down
      //Set the distance to move to be the last known mouse position when it
      //was clicked and the current mouse position being moved.
      svgRef.current.addEventListener(
        "pointermove",
        e => {
          if (isPanActive) {
            if (svgRef.current) {
              SVGAttributes.position.x += e.movementX * -1;
              SVGAttributes.position.y += e.movementY * -1;

              updateSVGViewBox(
                SVGAttributes.position.x,
                SVGAttributes.position.y,
                SVGAttributes.dimensions.width,
                SVGAttributes.dimensions.height
              );
            }
          }
        },
        false
      );

      //Stop panning the SVG if mouse has left the screen.
      svgRef.current.addEventListener(
        "pointerleave",
        () => {
          isPanActive = false;
        },
        false
      );

      svgRef.current.addEventListener(
        "wheel",
        e => {
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
        },
        false
      );
    }

    //TODO: Return function that removes event listeners on cleanup
  }, [svgRef, maxZoomDistance, zoomSpeed]);

  return React.cloneElement(React.Children.only(children) as ReactElement, {
    ref: svgRef
  });
};

export default PanAndZoomSVG;
