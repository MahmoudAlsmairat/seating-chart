import React, { useState } from "react";
import styles from "./styles.module.css";
const { seat, hoverSeat, reservedSeat } = styles;

export default function Seat({ isView = false }) {
  const [isReserved, setIsReserved] = useState(false);

  const seatClassName = isView ? `${seat} ${hoverSeat}` : seat;
  const handleClick = () => {
    setIsReserved((prevIsReserved) => !prevIsReserved);
    console.log(true);
  };

  let seatClasses = seatClassName;
  if (isReserved) {
    seatClasses += ` ${reservedSeat}`;
  }

  if (!isView) {
    return <span className={seatClasses}></span>;
  }

  return <span className={seatClasses} onClick={handleClick}></span>;
}
