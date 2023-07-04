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
    const { sectionsNum, rowsNum, columnsNum } = formData;
    const array2d = new Array(sectionsNum)
      .fill()
      .map((_, sectionIndex) =>
        new Array(rowsNum)
          .fill()
          .map((_, rowIndex) =>
            new Array(columnsNum)
              .fill()
              .map((_, columnIndex) => ({ picked: false }))
          )
      );

    setSections(array2d);
  };

  console.log(sections);
  return (
    <div className={container}>
      <Form
        formData={formData}
        changeHandler={changeHandler}
        onClickHandler={onClickHandler}
      />

      <div style={parentContainerStyle} className={sectionsContainer}>
        {sections?.map((item, id) => {
          return <Section seats={item} id={id} />;
        })}
      </div>
    </div>
  );
}
