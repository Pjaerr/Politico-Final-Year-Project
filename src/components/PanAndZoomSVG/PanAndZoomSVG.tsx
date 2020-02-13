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

      //Store pointer event when it occurs so we can check if multiple are down at once (multi-touch)

      let pointerEvents: PointerEvent[] = [];
      let previousDiffBetweenPointers = -1;

      //Register current mouse position when the map is clicked and enable dragging when mouse is moved
      svgRef.current.addEventListener(
        "pointerdown",
        e => {
          isPanActive = true;

          //Store pointer event
          pointerEvents.push(e);
        },
        false
      );

      //When the mouse is released, stop dragging.
      svgRef.current.addEventListener(
        "pointerup",
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

      /**
       * ! For Pinch to Zoom
       * https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Pinch_zoom_gestures
       *
       * Store events to keep track of multiple pointer events (ie two fingers being used)
       * and then in the pointermove event, if two pointers are down calculate the distance between
       * them both and if it has increased we zoom in and if it has decreased, we zoom out, taking our maxZoomDistance
       * into account.
       */

      //When the mouse is moved whilst the click is being held down
      //Set the distance to move to be the last known mouse position when it
      //was clicked and the current mouse position being moved.
      svgRef.current.addEventListener(
        "pointermove",
        e => {
          if (isPanActive) {
            if (svgRef.current) {
              //If this event is already being accounted for but has changed
              //Update its existing instance in the pointerEvents array
              for (let i = 0; i < pointerEvents.length; i++) {
                if (e.pointerId === pointerEvents[i].pointerId) {
                  pointerEvents[i] = e;
                  break;
                }
              }

              //If two pointers are down, start checking for pinch to zoom
              if (pointerEvents.length === 2) {
                console.log("two fingers held down");
                //Work out the difference between the two pointer events clientX values
                let currentDiffBetweenPointers = Math.abs(
                  pointerEvents[0].clientX - pointerEvents[1].clientX
                );

                if (previousDiffBetweenPointers > 0) {
                  if (
                    currentDiffBetweenPointers > previousDiffBetweenPointers
                  ) {
                    //Zoom in

                    const newWidth =
                      SVGAttributes.dimensions.width +
                      currentDiffBetweenPointers * -0.5;

                    const newHeight =
                      SVGAttributes.dimensions.height +
                      currentDiffBetweenPointers * -0.5;

                    if (newWidth > 0 && newHeight > 0) {
                      SVGAttributes.dimensions.width = newWidth;
                      SVGAttributes.dimensions.height = newHeight;
                    }
                  }

                  if (
                    currentDiffBetweenPointers < previousDiffBetweenPointers
                  ) {
                    const newWidth =
                      SVGAttributes.dimensions.width -
                      currentDiffBetweenPointers * -0.5;

                    const newHeight =
                      SVGAttributes.dimensions.height -
                      currentDiffBetweenPointers * -0.5;

                    if (newWidth > 0 && newHeight) {
                      SVGAttributes.dimensions.width = newWidth;
                      SVGAttributes.dimensions.height = newHeight;
                    }
                  }
                }

                previousDiffBetweenPointers = currentDiffBetweenPointers;
              }
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

      //TODO: Probably abstract this event into reusable function as scrolling is two seperate events for mouse/touch
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
