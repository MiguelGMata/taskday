import React from 'react';
import './modal.css'; // Cambié el nombre del archivo CSS

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <button className="custom-close-btn" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
