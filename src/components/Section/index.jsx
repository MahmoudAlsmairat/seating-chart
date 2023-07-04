import React, { useRef, useState } from "react";
import Seat from "../Seat";
import Moveable from "react-moveable";
import { Rnd } from "react-rnd";

import styles from "./styles.module.css";

const { container, sectionRow, seat } = styles;
export default function Section({ seats, id }) {
  const [showMovable, setShowMovable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const boxRef = useRef(null);
  const parentContainerStyle = {
    width: 700, // Set the width of the parent container
    height: 500, // Set the height of the parent container
    border: "1px solid #ccc",
    position: "relative",
  };
  const onDragStop = (e, d) => {
    if (
      d.x < 0 ||
      d.y < 0 ||
      d.x + boxRef.current.offsetWidth > parentContainerStyle.width ||
      d.y + boxRef.current.offsetHeight > parentContainerStyle.height
    ) {
      setIsDragging(false);
    }
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
  const sectionDivElement = document.getElementById(`${id}`);
  const width = sectionDivElement?.offsetWidth;
  const height = sectionDivElement?.offsetHeight;
  console.log("sectionDivElement", width, height);
  const arrayOfSeats = new Array(seats?.numOfRows)
    .fill()
    .map((_, rowIndex) =>
      new Array(seats?.seatsPerRow).fill().map((_, columnIndex) => ({}))
    );
  return (
    <>
      <Moveable
        target={document.querySelector(`.target` + id)}
        origin={false}
        draggable={true}
        throttleDrag={0}
        rotatable={true}
        throttleRotate={0}
        onRotateStart={handleRotateStart}
        onRotate={handleRotate}
        onRotateEnd={handleRotateEnd}
      />

      <Rnd
        className="target"
        ref={boxRef}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 200,
          height: 200,
          transform: `rotate(${rotationAngle}deg)`,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        bounds="parent" // Constrain dragging within the parent container
        onDragStart={() => setIsDragging(true)}
        onDragStop={onDragStop}
      >
        <div
          className={`target${id} ${container}`}
          onClick={() => {
            setShowMovable((prev) => !prev);
            setIsDragging((prev) => !prev);
          }}
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
      </Rnd>
    </>
  );
}
