import React, { useState, useRef, useEffect } from "react";
import Moveable from "react-moveable";
import { Rnd } from "react-rnd";
import { CloseCircleFilled } from "@ant-design/icons";
import styles from "./styles.module.css";

const { container, closeIcon } = styles;

export default function Shape({ component, id, setSections = () => {} }) {
  const [showMovable, setShowMovable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const boxRef = useRef(null);
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
      const currentUtils = prev?.utils[id];
      currentUtils.position = {
        rotation: rotationDeg,
        ...currentUtils.position,
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
      const currentUtils = prev?.utils[id];
      currentUtils.position = {
        ...currentUtils.position,
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

  const handleRemoveSection = () => {
    setSections((prev) => {
      const prevUtils = [...prev?.utils];
      prevUtils.splice(id, 1);
      return { ...prev, utils: prevUtils };
    });
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
        id={`rnd-container-shape${id}`}
        ref={boxRef}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
        bounds="parent" // Constrain dragging within the parent container
        onDragStart={() => setIsDragging(true)}
        onDragStop={onDragStop}
        onDrag={onDragging}
      >
        <div
          className={`targetShape${id} ${container}`}
          id={`shape-section${id}`}
          onClick={() => {
            setShowMovable((prev) => !prev);
            setIsDragging((prev) => !prev);
          }}
          ref={containerRef}
        >
          <div className={closeIcon} onClick={handleRemoveSection}>
            <CloseCircleFilled />
          </div>
          {component}
        </div>
      </Rnd>
    </>
  );
}
