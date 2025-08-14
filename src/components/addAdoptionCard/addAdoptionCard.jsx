// AddAdoptionCard.jsx
import React, { useRef, useState } from "react";
import { FaImage, FaPaw, FaCat, FaWeight, FaSignature, FaBirthdayCake, FaVenusMars } from "react-icons/fa";
import Modal from "../modal/Modal";
import "./addAdoptionCard.css";

const AddAdoptionCard = ({ onSubmit, uploading }) => {
  const fileInput = useRef();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nom_animal: "",
    raza_animal: "",
    especie_animal: "Gato",
    edad_animal: "",
    genero_animal: "",
    peso_animal: ""
  });


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(`Field changed: ${name} = ${value}`);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { nom_animal, especie_animal, edad_animal, genero_animal, peso_animal } = formData;
    if (!imageFile || !nom_animal || !especie_animal || !edad_animal || !genero_animal || !peso_animal) return;

    const data = new FormData();
    data.append("catPhoto", imageFile);
    console.log("Image file:", imageFile);
    Object.entries(formData).forEach(([key, value]) => data.append(key, key === "peso_animal" ? Number(value) : value));
    console.log("Submitting data:", data);

    await onSubmit(data);
    setShowModal(false);
    setFormData({
      nom_animal: "",
      especie_animal: "Gato",
      edad_animal: "",
      genero_animal: "",
      peso_animal: ""
    });
    setImagePreview(null);
    setImageFile(null);
  };

  return (
    <div className="add-card">
      <div className="add-card-header">
        <FaPaw className="add-card-header-icon" />
        <h4 className="add-card-header-title">Nuevo Gatito</h4>
      </div>

      <div className="add-card-image-preview">
        {imagePreview ? (
          <img src={imagePreview} alt="preview" className="image-preview" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '12px' }} />
        ) : (
          <button
            className="add-card-image-btn"
            onClick={() => fileInput.current.click()}
            disabled={uploading}
          >
            <FaImage size={32} className="add-card-image-icon" />
            <span>Subir foto</span>
          </button>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>

      <button
        className="add-card-info-btn"
        onClick={() => setShowModal(true)}
        disabled={!imageFile}
      >
        Agregar Nombre, Sexo y Edad
      </button>

      <p className="add-card-desc">
        Completa los datos y sube la foto para crear la tarjeta.
      </p>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="form-group-adoption">
          <label><FaSignature /> Nombre</label>
          <input type="text" name="nom_animal" value={formData.nom_animal} onChange={handleChange} />
          </div>
          {/* <div className="form-group-adoption">
            <label><FaDog /> Raza</label>
            <input type="text" name="raza_animal" value={formData.raza_animal} onChange={handleChange} />
          </div> */}
          <div className="form-group-adoption">
            <label><FaBirthdayCake /> Edad</label>
            <input type="text" name="edad_animal" value={formData.edad_animal} onChange={handleChange} />
          </div>
          <div className="form-group-adoption">
            <label><FaVenusMars /> Sexo</label>
            <select name="genero_animal" value={formData.genero_animal} onChange={handleChange}>
              <option value="">Seleccionar</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>
          <div className="form-group-adoption">
            <label><FaWeight /> Peso (kg)</label>
            <input type="number" name="peso_animal" value={formData.peso_animal} onChange={handleChange} min="0" step="0.1" />
          </div>
          <button onClick={handleSubmit} className="submit-button">🎉 Crear Tarjeta</button>
        </Modal>
      )}
    </div>
  );
};

export default AddAdoptionCard;
