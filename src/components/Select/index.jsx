import React, { useState } from "react";

const SelectComponent = ({ options, defaultValue, onChange }) => {
  const defaultOption = {
    id: 0,
    value: "Default",
    label: `${defaultValue}`,
  };

  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleSelectChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = options[selectedIndex - 1];
    setSelectedOption(selectedOption);
    onChange(selectedOption.id, selectedOption.value);
  };

  return (
    <div>
      <select onChange={handleSelectChange} value={selectedOption.value}>
        <option value={defaultOption.value} disabled>
          {defaultOption.label}
        </option>
        {options.map((option) => (
          <option key={option.idTicket} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
