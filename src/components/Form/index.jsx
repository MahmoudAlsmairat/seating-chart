import React from "react";
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
        <input
          name="rowsNum"
          type="number"
          value={formData?.rowsNum}
          onChange={changeHandler}
          placeholder="rows"
        />
      </div>
      <div className={inputWrapper}>
        <label>Columns Number</label>
        <input
          name="columnsNum"
          type="number"
          value={formData?.columnsNum}
          onChange={changeHandler}
          placeholder="column"
        />
      </div>
      <div className={actionWrapper}>
        <button onClick={onClickHandler}>Generate</button>
      </div>
    </div>
  );
}
