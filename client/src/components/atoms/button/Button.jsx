import React from 'react';
import './button.css';

const Button = ({ text, type, onClick, className }) => {
  return (
    <button className={`button ${className}`} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
