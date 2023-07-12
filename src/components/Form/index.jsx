import React from "react";

import { Button, Input } from "antd";
import styles from "./styles.module.css";

const { form, inputWrapper, actionWrapper } = styles;
export default function Form({
  changeHandler = () => {},
  formData = {},
  onClickHandler = () => {},
}) {
  return (
    <div className={form}>
      <div className={inputWrapper}>
        <label>Rows Number</label>
        <Input
          name="rowsNum"
          type="number"
          value={formData?.rowsNum}
          onChange={changeHandler}
          placeholder="rows"
          min={1}
        />
      </div>
      <div className={inputWrapper}>
        <label>Columns Number</label>
        <Input
          name="columnsNum"
          type="number"
          value={formData?.columnsNum}
          onChange={changeHandler}
          placeholder="column"
          min={1}
        />
      </div>
      <div className={inputWrapper}>
        <label>Sections Number</label>
        <Input
          name="sectionsNum"
          type="number"
          value={formData?.sectionsNum}
          onChange={changeHandler}
          placeholder="Sections number"
          min={1}
        />
      </div>
      <div className={actionWrapper}>
        <Button onClick={onClickHandler}>Generate</Button>
      </div>
    </div>
  );
}
