import React, { useState } from "react";
import { Select } from "antd";
import styles from "./styles.module.css";

const { Option } = Select;
const { selectContainer } = styles;
const SelectComponent = ({ options, defaultValue, onChange }) => {
  const defaultOption = {
    id: 0,
    value: "Default",
    label: `${defaultValue}`,
  };

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
    const selectedItems = options.filter((option) =>
      selectedValues.includes(option.value)
    );
    const selectedTicketArray = selectedItems.map((item) => ({
      id: item.id,
      value: item.value,
    }));
    onChange(selectedTicketArray);
  };

  return (
    <Select
      className={selectContainer}
      onChange={handleSelectChange}
      value={selectedOptions}
      mode="multiple"
      placeholder={defaultOption.label}
    >
      <Option value={defaultOption.value} disabled>
        {defaultOption.label}
      </Option>
      {options.map((option) => (
        <Option key={option.id} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default SelectComponent;
