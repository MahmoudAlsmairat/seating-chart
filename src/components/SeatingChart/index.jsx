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
    <div>
      <Form
        formData={formData}
        changeHandler={changeHandler}
        onClickHandler={onClickHandler}
      />
      {sections?.map((item) => {
        return <Section seats={item} />;
      })}
    </div>
  );
}
