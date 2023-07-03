import React from "react";
import Seat from "../Seat";
import styles from "./styles.module.css";

const { container, sectionRow, seat } = styles;
export default function Section({ seats }) {
  return (
    <div className={container}>
      {seats?.map((row, idx) => {
        return (
          <div key={idx} className={sectionRow}>
            {row?.map((colum, index) => {
              return <Seat key={index} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
