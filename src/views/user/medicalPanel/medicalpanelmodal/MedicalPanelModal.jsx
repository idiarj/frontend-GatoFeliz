import React from 'react';
import './MedicalPanelModal.css';


const MedicalPanelModal = ({ children, onClose }) => {
  // Cierra el modal si se hace click fuera del contenido
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose && onClose();
    }
  };
  return (
    <div className="medical-panel-modal-overlay" onClick={handleOverlayClick}>
      <div className="medical-panel-modal-content">
        <button className="medical-panel-modal-close" onClick={onClose} aria-label="Cerrar modal">&times;</button>
        {children}
      </div>
    </div>
  );
};

export default MedicalPanelModal;
