import React from "react";
import styles from "./styles.module.css";
import ViewSection from "../components/ViewSection";

const { container, header } = styles;

const ViewChart = () => {
  const sectionLocalStorage = JSON.parse(localStorage.getItem("sections"));
  const parentContainerHeight = localStorage.getItem("parentContainerHeight");
  console.log("parentContainerHeight", parentContainerHeight);

  return (
    <div>
      <h1 className={header}>Chart Page</h1>
      <div className={container} style={{ height: `${parentContainerHeight}` }}>
        {Object?.keys(sectionLocalStorage)?.map((item, id) => {
          return <ViewSection seats={sectionLocalStorage[item]} id={item} />;
        })}
      </div>
    </div>
  );
};

export default ViewChart;
