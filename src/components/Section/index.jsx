import React, { useRef, useState, useEffect } from "react";
import Seat from "../Seat";
import Moveable from "react-moveable";
import { Rnd } from "react-rnd";
import SelectComponent from "../Select";
import styles from "./styles.module.css";

const { container, sectionRow } = styles;
export default function Section({
  seats,
  id,
  setSections = () => {},
  sectionData,
}) {
  const [showMovable, setShowMovable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const { rowsNum, columnsNum } = sectionData;
  const [currentSectionData, setCurrentSectionData] = useState({
    id,
    type: "table or group",
    numOfRows: rowsNum,
    seatsPerRow: columnsNum,
    selectedTicket: null,
    position: {
      rotation: 0,
      translate: {
        translateX: 0,
        translateY: 0,
      },
    },
  });
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
    setCurrentSectionData((prev) => ({
      ...prev,
      position: {
        rotation: rotationDeg,
        translate: {
          translateX,
          translateY,
        },
      },
    }));
  };

  const handleRotateEnd = ({ target, isDrag, clientX, clientY }) => {
    console.log("onRotateEnd", target, isDrag);
  };
  // const sectionDivElement = document.getElementById(`${id}`);
  // const width = sectionDivElement?.offsetWidth;
  // const height = sectionDivElement?.offsetHeight;
  const arrayOfSeats = new Array(seats?.numOfRows)
    .fill()
    .map((_, rowIndex) =>
      new Array(seats?.seatsPerRow).fill().map((_, columnIndex) => ({}))
    );

  const options = [
    { id: 100, value: "Class A", label: "Class A" },
    { id: 200, value: "Class B", label: "Class B" },
    { id: 300, value: "Class C", label: "Class C" },
  ];

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
    setCurrentSectionData((prev) => ({
      ...prev,
      position: {
        rotation: rotationDeg,
        translate: {
          translateX,
          translateY,
        },
      },
    }));
  };
  const getTranslateValues = () => {
    const element = document.getElementById(`rnd-container${id}`);
    if (element) {
      const transformValue = element.style.transform;
      console.log("tttttt", transformValue);
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
  const handleChange = (id, value) => {
    setCurrentSectionData((prev) => ({
      ...prev,
      selectedTicket: { id, value },
    }));
  };
  useEffect(() => {
    setSections((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [id]: {
          ...currentSectionData,
        },
      },
    }));
  }, [currentSectionData]);
  return (
    <>
      <Moveable
        target={showMovable && document.querySelector(`.target` + id)}
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
        id={`rnd-container${id}`}
        ref={boxRef}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
        bounds="parent"
        onDragStart={() => setIsDragging(true)}
        onDragStop={onDragStop}
        onDrag={onDragging}
        enableResizing={false}
      >
        <div
          className={`target${id} ${container}`}
          id={`section-container${id}`}
        >
          <span>{seats?.selectedTicket?.value}</span>
          {arrayOfSeats?.map((row, idx) => {
            return (
              <div
                key={idx}
                className={sectionRow}
                id={id}
                onClick={() => {
                  setShowMovable((prev) => !prev);
                  setIsDragging((prev) => !prev);
                }}
              >
                {row?.map((colum, index) => {
                  return <Seat key={index} />;
                })}
              </div>
            );
          })}
          <SelectComponent
            options={options}
            defaultValue="Select an Ticket"
            onChange={handleChange}
          />
        </div>
      </Rnd>
    </>
  );
}
