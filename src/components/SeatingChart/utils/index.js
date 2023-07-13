import { ImportOutlined, ExportOutlined } from "@ant-design/icons";
import stage from "../../assets/stage.avif";

export const renderShape = (type) => {
  switch (type) {
    case "stage":
      return (
        <img
          src={stage}
          alt="stage"
          width="400px"
          height="200px"
          style={{
            borderRadius: "10px",
          }}
        />
      );
    case "entranceDoor":
      return (
        <ImportOutlined
          style={{
            fontSize: "55px",
            color: "#1A5276",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        />
      );
    case "exitDoor":
      return (
        <ExportOutlined
          style={{
            fontSize: "55px",
            color: "#1A5276",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        />
      );
    default:
      return null;
  }
};

export const handleRotate = ({ target, dist, transform, setSections, id }) => {
  target.style.transform = transform;
  const rotationDeg = getRotationValue(id);
  setSections((prev) => {
    const updatedSections = prev.map((section) => {
      if (section.id === id) {
        return {
          ...section,
          position: {
            ...section.position,
            rotation: rotationDeg,
          },
        };
      }
      return section;
    });
    return updatedSections;
  });
};

export const getRotationValue = (id) => {
  const divElement = document.getElementById(`shape-section${id}`);
  let rotation = 0;
  if (divElement) {
    const transformValue = divElement.style.transform;
    const match = transformValue.match(/rotate\((-?\d+\.?\d*)deg\)/);
    if (match && match[1]) {
      rotation = parseFloat(match[1]);
    }
  }
  console.log("rotation", rotation);
  return rotation;
};

export const getTranslateValues = (id) => {
  const element = document.getElementById(`rnd-container-shape${id}`);
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

export const onDragging = (setSections, id) => {
  const { translateX, translateY } = getTranslateValues(id);
  setSections((prev) => {
    const updatedSections = prev.map((section) => {
      if (section.id === id) {
        return {
          ...section,
          position: {
            ...section.position,
            translate: {
              translateX,
              translateY,
            },
          },
        };
      }
      return section;
    });
    return updatedSections;
  });
};

const parentContainerStyle = {
  width: 700, // Set the width of the parent container
  height: 500, // Set the height of the parent container
  border: "1px solid #ccc",
  position: "relative",
};

export const onDragStop = (e, d, boxRef, setIsDragging) => {
  if (
    d.x < 0 ||
    d.y < 0 ||
    d.x + boxRef.current.offsetWidth > parentContainerStyle.width ||
    d.y + boxRef.current.offsetHeight > parentContainerStyle.height
  ) {
    setIsDragging(false);
  }
};
