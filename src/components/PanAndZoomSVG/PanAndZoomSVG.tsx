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

      /* Stuff for Multi-Touch */
      //Store pointer event when it occurs so we can check if multiple are down at once (multi-touch)
      let pointerEvents: PointerEvent[] = [];

      //The last stored distance between two pointers (fingers)
      let previousDiffBetweenPointers = -1;

      const removePointerEvent = (e: PointerEvent) => {
        //Remove this pointer event from the array of pointer events if it exists
        for (let i = 0; i < pointerEvents.length; i++) {
          if (pointerEvents[i].pointerId === e.pointerId) {
            pointerEvents.splice(i, 1);
            break;
          }
        }
      };

      const updatePointerEvent = (e: PointerEvent) => {
        //If this event is already being accounted for but has changed
        //Update its existing instance in the pointerEvents array
        for (let i = 0; i < pointerEvents.length; i++) {
          if (e.pointerId === pointerEvents[i].pointerId) {
            pointerEvents[i] = e;
            break;
          }
        }
      };

      //Enable panning when the SVG is clicked/touched and add the pointer event to the array of pointer events
      svgRef.current.addEventListener(
        "pointerdown",
        e => {
          isPanActive = true;

          //Store pointer event
          pointerEvents.push(e);
        },
        false
      );

      //When the mouse/finger is released, disable panning and remove the pointer event from the array of pointer events
      svgRef.current.addEventListener(
        "pointerup",
        e => {
          isPanActive = false;

          removePointerEvent(e);
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
              updatePointerEvent(e);

              //If two pointers are down, start checking for pinch to zoom
              if (pointerEvents.length === 2) {
                //Work out the difference between the two pointer events clientX values (space between the fingers)
                let currentDiffBetweenPointers = Math.abs(
                  pointerEvents[0].clientX - pointerEvents[1].clientX
                );

                //If we've tracked a pinch previously
                if (previousDiffBetweenPointers > 0) {
                  let direction = 0;

                  //We're pinching outwards
                  if (
                    currentDiffBetweenPointers > previousDiffBetweenPointers
                  ) {
                    direction = -1;
                  }

                  //We're pinching inwards
                  if (
                    currentDiffBetweenPointers < previousDiffBetweenPointers
                  ) {
                    direction = 1;
                  }

                  //If there has been a change in the pinching direction (ie. the fingers aren't sitting still)
                  if (direction !== 0) {
                    const newWidth =
                      SVGAttributes.dimensions.width +
                      currentDiffBetweenPointers * zoomSpeed * direction;

                    const newHeight =
                      SVGAttributes.dimensions.height +
                      currentDiffBetweenPointers * zoomSpeed * direction;

                    //If the new dimensions wouldn't result in negative SVG viewBox values
                    if (
                      newWidth > 0 &&
                      newHeight > 0 &&
                      newWidth < maxZoomDistance &&
                      newHeight < maxZoomDistance
                    ) {
                      SVGAttributes.dimensions.width = newWidth;
                      SVGAttributes.dimensions.height = newHeight;
                    }
                  }
                }

                //Store the previous distance between the fingers so we can calculate the change
                previousDiffBetweenPointers = currentDiffBetweenPointers;
              } else {
                //Only 1 pointer/finger is down, just pan as usual.
                SVGAttributes.position.x += e.movementX * -1;
                SVGAttributes.position.y += e.movementY * -1;
              }

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
        e => {
          isPanActive = false;

          //Remove this pointer event from the array of pointer events if it exists
          for (let i = 0; i < pointerEvents.length; i++) {
            if (pointerEvents[i].pointerId === e.pointerId) {
              pointerEvents.splice(i, 1);
              break;
            }
          }
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
