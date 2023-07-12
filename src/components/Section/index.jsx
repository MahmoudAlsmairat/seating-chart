import React, { useRef, useState, useEffect } from "react";
import Seat from "../Seat";
import Moveable from "react-moveable";
import { Rnd } from "react-rnd";
import SelectComponent from "../Select";
import { Dropdown, Button, Menu } from "antd";
import {
  MoreOutlined,
  CopyOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import styles from "./styles.module.css";

const { container, sectionRow, menuWrapper } = styles;
export default function Section({
  seats,
  id,
  setSections = () => {},
  deleteSection = () => {},
  copyHandler = () => {},
}) {
  const [showMovable, setShowMovable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowMovable(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
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
    const rotationDeg = getRotationValue();
    setSections((prev) => {
      let currentSec = prev?.sections[id];
      currentSec = {
        ...currentSec,
        position: {
          ...currentSec.position,
          rotation: rotationDeg,
        },
      };
      prev.sections[id] = currentSec;
      return prev;
    });
  };

  const handleRotateEnd = ({ target, isDrag, clientX, clientY }) => {
    console.log("onRotateEnd", target, isDrag);
  };

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
    let rotation = 0;
    if (divElement) {
      const transformValue = divElement.style.transform;
      const match = transformValue.match(/rotate\((-?\d+\.?\d*)deg\)/);
      if (match && match[1]) {
        rotation = parseFloat(match[1]);
      }
    }
    return rotation;
  };
  const getTranslateValues = () => {
    const element = document.getElementById(`rnd-container${id}`);
    let translateX = 0;
    let translateY = 0;
    if (element) {
      const transformValue = element.style.transform;
      console.log("tttttt", transformValue);
      const match = transformValue.match(
        /translate\(([-0-9.]+)px, ([-0-9.]+)px\)/
      );
      if (match && match[1] && match[2]) {
        translateX = parseFloat(match[1]);
        translateY = parseFloat(match[2]);
      }
    }
    return { translateX, translateY };
  };
  const onDragging = () => {
    const { translateX, translateY } = getTranslateValues();
    setSections((prev) => {
      let currentSec = prev?.sections[id];
      currentSec = {
        ...currentSec,
        position: {
          ...currentSec?.position,
          translate: {
            translateX,
            translateY,
          },
        },
      };
      prev.sections[id] = currentSec;
      console.log("currentSec", currentSec);
      return prev;
    });
  };
  const handleChange = (id, value) => {
    setSections((prev) => {
      let currentSec = prev.sections[id];
      currentSec = {
        ...currentSec,
        selectedTicket: { id, value },
      };
      prev.sections[id] = currentSec;
      return prev;
    });
  };
  const transformStyle = {
    transform: `rotate(${seats?.position?.rotation}deg)`,
    top: `${seats?.position?.translate?.translateY}px`,
    left: `${seats?.position?.translate?.translateX}px`,
  };
  const handleMenuClick = (e) => {
    const actionKey = e.key;
    return (
      {
        delete: deleteSection,
        copy: copyHandler,
      }[actionKey](id) || null
    );
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="delete">
        <CloseCircleOutlined /> Delete
      </Menu.Item>
      <Menu.Item key="copy">
        <CopyOutlined /> Copy
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Moveable
        target={showMovable && document.querySelector(`.target` + id)}
        origin={false}
        draggable={true}
        throttleDrag={0}
        rotatable={true}
        keepRatio={true}
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
          ref={containerRef}
          style={transformStyle}
        >
          <div className={menuWrapper}>
            <Dropdown overlay={menu}>
              <Button icon={<MoreOutlined />}></Button>
            </Dropdown>
          </div>
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
