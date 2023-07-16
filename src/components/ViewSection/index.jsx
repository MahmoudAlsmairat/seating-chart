import React from "react";
import Seat from "../Seat";

import styles from "./styles.module.css";

export default function ViewSection({ seats, id, selectedTickets, position }) {
  const arrayOfSeats = new Array(seats?.numOfRows)
    .fill()
    .map((_, rowIndex) =>
      new Array(seats?.seatsPerRow).fill().map((_, columnIndex) => ({}))
    );

  const transformStyle = {
    transform: `rotate(${position?.rotation}deg)`,
    top: `${position?.translate?.translateY}px`,
    left: `${position?.translate?.translateX}px`,
  };

  return (
    <div className={styles.container} style={transformStyle}>
      <div className={styles.ticketsContainer}>
        {selectedTickets?.length > 0 &&
          selectedTickets?.map((ticket) => {
            return <div key={ticket?.id}>{ticket?.value}</div>;
          })}
      </div>
      {arrayOfSeats?.map((row, idx) => {
        return (
          <div key={idx} className={styles.sectionRow} id={id}>
            {row?.map((colum, index) => {
              return <Seat key={index} isView={true} id={index} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
