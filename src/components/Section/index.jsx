import React, { useState } from "react";
import Seat from "../Seat";
import Moveable from "react-moveable";

import styles from "./styles.module.css";

const { container, sectionRow, seat } = styles;
export default function Section({ seats, id }) {
  const [showMovable, setShowMovable] = useState(false);
  const handleDragStart = ({ target, clientX, clientY }) => {
    console.log("onDragStart", target);
  };

  const handleDrag = ({ target, left, top, transform }) => {
    console.log("onDrag left, top", left, top);
    target.style.transform = transform;
  };

  const handleDragEnd = ({ target, isDrag, clientX, clientY }) => {
    console.log("onDragEnd", target, isDrag);
  };

  const handleRotateStart = ({ target, clientX, clientY }) => {
    console.log("onRotateStart", target);
  };

  const handleRotate = ({ target, dist, transform }) => {
    console.log("onRotate", dist);
    target.style.transform = transform;
  };

  const handleRotateEnd = ({ target, isDrag, clientX, clientY }) => {
    console.log("onRotateEnd", target, isDrag);
  };
  const divElement = document.getElementById(`${id}`);
  const width = divElement?.offsetWidth;
  const height = divElement?.offsetHeight;
  console.log("width", width, "height", height);
  const arrayOfSeats = new Array(seats?.numOfRows)
    .fill()
    .map((_, rowIndex) =>
      new Array(seats?.seatsPerRow).fill().map((_, columnIndex) => ({}))
    );
  return (
    <>
      <Moveable
        target={showMovable && document.querySelector(`.target` + id)}
        container={null}
        origin={false}
        edge={false}
        draggable={true}
        throttleDrag={0}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        keepRatio={false}
        resizable={false}
        throttleResize={0}
        scalable={false}
        throttleScale={0}
        rotatable={true}
        throttleRotate={0}
        onRotateStart={handleRotateStart}
        onRotate={handleRotate}
        onRotateEnd={handleRotateEnd}
        pinchable={false}
      />

      <div
        className={`target${id} ${container}`}
        onClick={() => setShowMovable((prev) => !prev)}
      >
        {arrayOfSeats?.map((row, idx) => {
          return (
            <div key={idx} className={sectionRow} id={id}>
              {row?.map((colum, index) => {
                return <Seat key={index} />;
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
