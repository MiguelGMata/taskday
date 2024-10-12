import React from 'react';
import './input.css';

const Input = ({ type, placeholder, value, onChange, name, className }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input ${className}`}
    />
  );
};

export default Input;
