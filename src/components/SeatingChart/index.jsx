import React, { useState } from "react";
import Form from "../Form";
import Section from "../Section";

export default function SeatingChart() {
  const [formData, setFormData] = useState({});
  const [sections, setSections] = useState([]);

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
        sectionName: "",
        ticketId: 1,
        numOfRows: rowsNum,
        seatsPerRow: columnsNum,
      },
    ]);
  };

  return (
    <div>
      <Form
        formData={formData}
        changeHandler={changeHandler}
        onClickHandler={onClickHandler}
      />

      {sections?.map((item, id) => {
        return <Section seats={item} id={id} />;
      })}
    </div>
  );
}
