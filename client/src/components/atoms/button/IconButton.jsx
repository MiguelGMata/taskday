import React, { Children } from 'react';
import './button.css';

const ButtonIcon = ({ children, type, onClick }) => {
  return (
    <button className="button-icon" type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonIcon;