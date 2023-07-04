import React, { useState } from "react";
import Seat from "../Seat";
import Moveable from "react-moveable";
import SelectComponent from "../Select";
import styles from "./styles.module.css";

const { container, sectionRow, seat } = styles;
export default function Section({ seats, id, setSections = () => {} }) {
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

  const options = [
    { value: "Class A", label: "Class A" },
    { value: "Class B", label: "Class B" },
    { value: "Class C", label: "Class C" },
  ];

  const handleChange = (value) => {
    // Handle the selected value
    setSections((prev) => {
      const clonedSections = [...prev];
      const currentSection = { ...clonedSections[id], ticketName: value };
      clonedSections[id] = currentSection;
      return [...clonedSections];
    });
    console.log("Selected value:", value);
  };
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

      <div className={`target${id} ${container}`}>
        <span>{seats?.ticketName}</span>
        {arrayOfSeats?.map((row, idx) => {
          return (
            <div
              key={idx}
              className={sectionRow}
              id={id}
              onClick={() => setShowMovable((prev) => !prev)}
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
    </>
  );
}
