import React from 'react';
import './adoptionCard.css';

const AdoptionCard = ({
  name,
  gender,
  age,
  image,
  onRequest,
  buttonLabel = 'ENVIAR SOLICITUD'
}) => {
  return (
    <div className="adoption-card">
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
        <button
          className="adoption-card-button"
          onClick={onRequest}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default AdoptionCard;
