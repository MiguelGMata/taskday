import React from 'react';
import './input.css';

const Input = ({ type, placeholder, value, onChange, checked, name, className }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      checked={checked} 
      className={`input ${className}`}
    />
  );
};

export default Input;
