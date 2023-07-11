import React, { useState } from "react";
import { Select } from "antd";

const { Option } = Select;

const SelectComponent = ({ options, defaultValue, onChange }) => {
  const defaultOption = {
    id: 0,
    value: "Default",
    label: `${defaultValue}`,
  };

  const [selectedOption, setSelectedOption] = useState(defaultOption.value);

  const handleSelectChange = (value, option) => {
    setSelectedOption(value);
    const selectedOption = options.find((o) => o.value === value);
    onChange(selectedOption.id, selectedOption.value);
  };

  return (
    <div>
      <Select
        onChange={handleSelectChange}
        value={selectedOption}
        defaultValue={defaultOption.value}
      >
        <Option value={defaultOption.value} disabled>
          {defaultOption.label}
        </Option>
        {options.map((option) => (
          <Option key={option.idTicket} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectComponent;
