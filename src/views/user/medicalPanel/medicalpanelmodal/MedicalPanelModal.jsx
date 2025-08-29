import React from 'react';
import './MedicalPanelModal.css';

const MedicalPanelModal = ({ children, onClose }) => {
  return (
    <div className="medical-panel-modal-overlay">
      <div className="medical-panel-modal-content">
        <button className="medical-panel-modal-close" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default MedicalPanelModal;
