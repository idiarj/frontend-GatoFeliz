import React from 'react';
import { MdIosShare } from 'react-icons/md';
import './adoptionCard.css';


const AdoptionCard = ({
  name,
  gender,
  age,
  image,
  onRequest,
  buttonLabel = 'ENVIAR SOLICITUD',
  boxShadow = true
}) => {
  const pageUrl = `${window.location.origin}/adopcion/${encodeURIComponent(name)}`;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    alert('¡Enlace copiado! Puedes compartirlo donde quieras.');
  };

  return (
    <div
      className="adoption-card"
      style={boxShadow ? { boxShadow: '0 4px 16px rgba(0,0,0,0.15)' } : { boxShadow: 'none' }}
    >
      <div className="adoption-card-image-wrapper">
        <img
          src={image}
          alt={name}
          className="adoption-card-image"
        />
      </div>
      <div className="adoption-card-content">
        <h3 className="adoption-card-title">{name}</h3>
        <p className="adoption-card-subtitle">
          {gender} &bull; {age}
        </p>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <button
            className="adoption-card-button adoption-card-button-large"
            onClick={onRequest}
          >
            {buttonLabel}
          </button>
          <button className="adoption-card-share-icon" onClick={handleCopyLink} style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}>
            <MdIosShare size={24} color="#FF9800" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdoptionCard;
