import React from "react";
import styles from "./styles.module.css";
import ViewSection from "../components/ViewSection";
import { ImportOutlined, ExportOutlined } from "@ant-design/icons";
import stage from "../components/assets/stage.avif";
const { container, header } = styles;

const shape = {
  stage: (
    <img
      src={stage}
      alt="stage"
      width="400px"
      height="200px"
      style={{
        borderRadius: "10px",
      }}
    />
  ),
  entranceDoor: (
    <ImportOutlined
      style={{
        fontSize: "55px",
        color: "#1A5276",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    />
  ),
  exitDoor: (
    <ExportOutlined
      style={{
        fontSize: "55px",
        color: "#1A5276",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    />
  ),
};
const ViewChart = () => {
  const sectionLocalStorage = JSON.parse(localStorage.getItem("sections"));
  const parentContainerHeight = localStorage.getItem("parentContainerHeight");

  return (
    <div>
      <h1 className={header}>Chart Page</h1>
      <div className={container} style={{ height: `${parentContainerHeight}` }}>
        {sectionLocalStorage?.utils?.map((item) => {
          console.log(
            "item?.position?.translate?.translateY",
            item?.position?.translate?.translateY
          );
          const transformStyle = {
            transform: `rotate(${item?.position?.rotation}deg)`,
            top: `${item?.position?.translate?.translateY}px`,
            left: `${item?.position?.translate?.translateX}px`,
            position: "absolute",
          };
          return <div style={transformStyle}>{shape[item?.type]}</div>;
        })}
        {Object?.keys(sectionLocalStorage?.sections)?.map((item, id) => {
          return (
            <ViewSection
              seats={sectionLocalStorage?.sections[item]}
              id={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ViewChart;
