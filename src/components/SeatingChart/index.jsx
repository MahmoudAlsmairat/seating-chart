import React, { useState } from "react";
import { Rnd } from "react-rnd";
import Form from "../Form";
import Section from "../Section";
import styles from "./styles.module.css";
const { container, centerContainer, centerContent, parentContainer } = styles;

export default function SeatingChart() {
  const [formData, setFormData] = useState({
    rowsNum: 0,
    columnsNum: 0,
  });
  const [sections, setSections] = useState({});
  const [pageHeight, setPageHeight] = useState(500);
  const [numOfSections, setNumOfSections] = useState(0);
  const changeHandler = ({ target: { value, name } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: +value,
    }));
  };
  console.log("FinalObj", sections);
  const onClickHandler = () => {
    const { rowsNum, columnsNum } = formData;
    setNumOfSections(numOfSections + 1);
    setSections((prev) => ({
      ...prev,
      [numOfSections + 1]: {
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
    }));
  };
  const handleResize = (e, direction, ref, delta, position) => {
    setPageHeight(pageHeight + 5);
  };
  return (
    <div className={container} style={{ height: `${pageHeight}px` }}>
      <Form
        formData={formData}
        changeHandler={changeHandler}
        onClickHandler={onClickHandler}
      />

      <div className={centerContainer}>
        <div className={centerContent}>
          <Rnd
            className={parentContainer}
            enableResizing={{
              top: true,
              right: false,
              bottom: true,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
            disableDragging={true}
            default={{
              width: window.innerWidth - 50,
              height: 200,
            }}
            onResize={handleResize}
          >
            {Object?.keys(sections)?.map((item, id) => {
              return (
                <Section
                  seats={sections[item]}
                  id={item}
                  sectionData={formData}
                  setSections={setSections}
                />
              );
            })}
          </Rnd>
        </div>
      </div>
    </div>
  );
}
