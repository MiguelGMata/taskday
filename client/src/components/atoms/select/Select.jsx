import React from 'react';
import './select.css';

const Select = ({ name, value, onChange, options, placeholder }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="select-input"
      required
      style={{
        padding: '10px',
        border: '1px solid #ef5a8d',
        borderRadius: '5px',
        marginBottom: '15px',
        cursor: 'pointer',
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
