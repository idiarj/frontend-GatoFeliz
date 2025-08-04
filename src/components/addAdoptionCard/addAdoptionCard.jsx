import React, { useRef } from "react";
import { FaImage, FaPaw } from "react-icons/fa";
import "./addAdoptionCard.css";

const AddAdoptionCard = ({ onAddImage, onAddInfo, uploading }) => {
  const fileInput = useRef();

  return (
    <div className="add-card">
      <div className="add-card-header">
        <FaPaw className="add-card-header-icon" />
        <h4 className="add-card-header-title">Nuevo Gatito</h4>
      </div>

      <button
        className="add-card-image-btn"
        onClick={() => fileInput.current.click()}
        disabled={uploading}
      >
        <FaImage size={32} className="add-card-image-icon" />
        <span>Subir foto</span>
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          style={{ display: "none" }}
        />
      </button>

      <button
        className="add-card-info-btn"
        onClick={onAddInfo}
      >
        Agregar Nombre, Sexo y Edad
      </button>

      <p className="add-card-desc">
        Completa los datos y sube la foto para crear la tarjeta.
      </p>
    </div>
  );
};

export default AddAdoptionCard;
