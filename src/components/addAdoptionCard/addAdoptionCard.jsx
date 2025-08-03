import React, { useRef } from "react";
import { FaImage, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import './addAdoptionCard.css';

const AddAdoptionCard = ({ onAdd, uploading }) => {
  const fileInput = useRef();

  return (
    <div className="add-adoption-card-root">
      <button
        className="add-adoption-card-img-btn"
        onClick={() => fileInput.current.click()}
      >
        <FaImage size={48} className="add-adoption-card-img-icon" />
        Insertar imagen
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          style={{ display: "none" }}
          disabled={uploading}
        />
      </button>
      <div className="add-adoption-card-fields">
        <button className="add-adoption-card-fields-btn">
          Agregar nombre | Sexo | Edad
        </button>
      </div>
      <div className="add-adoption-card-desc">
        Completa los datos y sube la foto del animal para crear una nueva tarjeta de adopción.
      </div>
    </div>
  );
};

export default AddAdoptionCard;