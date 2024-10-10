import React from 'react';
import './label.css';

const Label = ({ htmlFor, text, className }) => {
  return (
    <label htmlFor={htmlFor} className={`label ${className}`}>
      {text}
    </label>
  );
};

export default Label;
