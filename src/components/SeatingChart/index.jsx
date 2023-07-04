import React, { useState } from "react";
import Form from "../Form";
import Section from "../Section";
import styles from "./styles.module.css";
const { container, sectionsContainer } = styles;

export default function SeatingChart() {
  const [formData, setFormData] = useState({});
  const [sections, setSections] = useState([]);
  const parentContainerStyle = {
    width: window.innerWidth - 20, // Set the width of the parent container
    height: 500, // Set the height of the parent container
    border: "1px solid #ccc",
    position: "relative",
  };
  const changeHandler = ({ target: { value, name } }) => {
    setFormData((prev) => ({ ...prev, [name]: +value }));
  };
  const onClickHandler = () => {
    const { rowsNum, columnsNum } = formData;

    setSections((prev) => [
      ...prev,
      {
        position: {
          top: 151,
          rotate: 151,
          left: 121,
        },

        id: "",
        type: "table or group",
        ticketName: "",
        ticketId: 1,
        numOfRows: rowsNum,
        seatsPerRow: columnsNum,
      },
    ]);
  };

  return (
    <div className={container}>
      <Form
        formData={formData}
        changeHandler={changeHandler}
        onClickHandler={onClickHandler}
      />

      <div style={parentContainerStyle} className={sectionsContainer}>
        {sections?.map((item, id) => {
          return <Section seats={item} id={id} setSections={setSections} />;
        })}
      </div>
    </div>
  );
}
