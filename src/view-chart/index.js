import React from "react";
import styles from "./styles.module.css";
import ViewSection from "../components/ViewSection";
import { renderShape } from "../components/SeatingChart/utils";
const { container, header } = styles;


const ViewChart = () => {
  const sectionLocalStorage = JSON.parse(localStorage.getItem("sections"));
  const parentContainerHeight = localStorage.getItem("parentContainerHeight");

  return (
    <div>
      <h1 className={header}>Chart Page</h1>
      <div className={container} style={{ height: `${parentContainerHeight}` }}>
    
        {sectionLocalStorage?.map((item, id) => {
          if (item?.type === "section") {
            return (
              <ViewSection
                seats={item.seats}
                position={item?.position}
                selectedTickets={item?.selectedTickets}
                id={item.id}
                key={item.id}
              />
            );
          } else {
            const transformStyle = {
              transform: `rotate(${item?.position?.rotation}deg)`,
              top: `${item?.position?.translate?.translateY}px`,
              left: `${item?.position?.translate?.translateX}px`,
              position: "absolute",
            };
            return <div style={transformStyle}>{renderShape(item?.type)}</div>;
          }
        })}
      </div>
    </div>
  );
};

export default ViewChart;
