import React from 'react';
import './messageModal.css';

const MessageModal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button className="close-btn" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
