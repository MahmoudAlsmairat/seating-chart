import React, { useState, useRef } from "react";
import Moveable from "react-moveable";
import { Rnd } from "react-rnd";
import styles from "./styles.module.css";

const { container, sectionRow } = styles;
export default function Shape({ component, id, setSections = () => {} }) {
  const [showMovable, setShowMovable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

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
    target.style.transform = transform;
    getRotationValue();
    setSections((prev) => {
      const currentUtils = prev?.utils[id];
      currentUtils.position = {
        rotation: rotationDeg,
        translate: {
          translateX,
          translateY,
        },
      };
      const utils = [...prev?.utils];
      utils[id] = currentUtils;
      return {
        ...prev,
        utils,
      };
    });
  };

  const handleRotateEnd = ({ target, isDrag, clientX, clientY }) => {
    console.log("onRotateEnd", target, isDrag);
  };
  // const sectionDivElement = document.getElementById(`${id}`);
  // const width = sectionDivElement?.offsetWidth;
  // const height = sectionDivElement?.offsetHeight;
  // const arrayOfSeats = new Array(seats?.numOfRows)
  //   .fill()
  //   .map((_, rowIndex) =>
  //     new Array(seats?.seatsPerRow).fill().map((_, columnIndex) => ({}))
  //   );

  // const options = [
  //   { id: 100, value: "Class A", label: "Class A" },
  //   { id: 200, value: "Class B", label: "Class B" },
  //   { id: 300, value: "Class C", label: "Class C" },
  // ];

  const getRotationValue = () => {
    const divElement = document.getElementById(`section-container${id}`);
    if (divElement) {
      const transformValue = divElement.style.transform;
      const match = transformValue.match(/rotate\((-?\d+\.?\d*)deg\)/);
      if (match && match[1]) {
        const rotation = parseFloat(match[1]);
        setRotationDeg(rotation);
        console.log("rotation", rotation);
      }
    }
  };
  const onDragging = () => {
    console.log("onDragging");
    getTranslateValues();
    setSections((prev) => {
      const currentUtils = prev?.utils[id];
      currentUtils.position = {
        rotation: rotationDeg,
        translate: {
          translateX,
          translateY,
        },
      };
      const utils = [...prev?.utils];
      utils[id] = currentUtils;
      return {
        ...prev,
        utils,
      };
    });
  };
  const getTranslateValues = () => {
    const element = document.getElementById(`rnd-container${id}`);
    if (element) {
      const transformValue = element.style.transform;
      const match = transformValue.match(
        /translate\(([-0-9.]+)px, ([-0-9.]+)px\)/
      );
      if (match && match[1] && match[2]) {
        const translateX = parseFloat(match[1]);
        const translateY = parseFloat(match[2]);
        setTranslateX(translateX);
        setTranslateY(translateY);
        console.log("TranslateX:", translateX);
        console.log("TranslateY:", translateY);
      }
    }
  };
  return (
    <>
      <Moveable
        target={showMovable && document.querySelector(`.targetShape` + id)}
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
        className="targetShape"
        id={`rnd-container${id}`}
        ref={boxRef}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
        bounds="parent" // Constrain dragging within the parent container
        onDragStart={() => setIsDragging(true)}
        onDragStop={onDragStop}
        onDrag={onDragging}
        enableResizing={false}
      >
        <div
          className={`targetShape${id} ${container}`}
          id={`section-container${id}`}
          onClick={() => {
            setShowMovable((prev) => !prev);
            setIsDragging((prev) => !prev);
          }}
        >
          {component}
        </div>
      </Rnd>
    </>
  );
}
