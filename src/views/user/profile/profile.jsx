import React, { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import tabby from '../../../assets/perfil/tabby.png';
import tuxedo from '../../../assets/perfil/tuxedo.png';
import carey from '../../../assets/perfil/carey.png';
import amarillo from '../../../assets/perfil/amarillo.png';
import siames from '../../../assets/perfil/siames.png';
import blanco from '../../../assets/perfil/blanco.png';

const profileImages = [
  { key: "tabby.png", src: tabby },
  { key: "tuxedo.png", src: tuxedo },
  { key: "carey.png", src: carey },
  { key: "amarillo.png", src: amarillo },
  { key: "siames.png", src: siames },
  { key: "blanco.png", src: blanco }
];

// Datos de ejemplo para pruebas
const mockUser = {
  name: "Victoria Acosta",
  username: "vic_acosta",
  email: "victoria@example.com",
  phone: "0414-693-5805",
  profileImg: "amarillo.png"
};

const Profile = () => {
  // const { user, updateUser } = useContext(UserContext);
  const updateUser = (data) => {};
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    username: mockUser.username,
    email: mockUser.email,
    phone: mockUser.phone,
    profileImg: mockUser.profileImg
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImgChange = (imgKey) => {
    setFormData({ ...formData, profileImg: imgKey });
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setFormData({
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      profileImg: user?.profileImg || profileImages[0]
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(formData);
    setEditMode(false);
  };

  const goToRecoverPassword = () => {
    navigate("/recoverpassword");
  };

  return (
    <div className="profile-main-container">
      <div className="profile-content">
        <div className="profile-left">
          <img
            src={profileImages.find(img => img.key === formData.profileImg)?.src}
            alt="Foto de perfil"
            className="profile-img"
          />
          <h2 style={{ color: "#F26C1F", marginTop: 10 }}>{formData.name}</h2>
          <div className="profile-info-card">
            <div className="profile-info-item">
              <span role="img" aria-label="nombre">👤</span>
              <div>
                <div className="profile-label">Nombre</div>
                <div>{formData.name}</div>
              </div>
            </div>
            <div className="profile-info-item">
              <span role="img" aria-label="usuario">✉️</span>
              <div>
                <div className="profile-label">Usuario</div>
                <div>@{formData.username}</div>
              </div>
            </div>
            <div className="profile-info-item">
              <span role="img" aria-label="correo">📧</span>
              <div>
                <div className="profile-label">Correo</div>
                <div>{formData.email}</div>
              </div>
            </div>
            <div className="profile-info-item">
              <span role="img" aria-label="telefono">📞</span>
              <div>
                <div className="profile-label">Teléfono</div>
                <div>{formData.phone}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-right">
          <div className="profile-actions-card">
            <div className="profile-actions-title">ACCIONES RÁPIDAS</div>
            <button className="profile-action-btn" onClick={handleEdit}>
              <span role="img" aria-label="editar">✏️</span> Editar Perfil
            </button>
            <button className="profile-action-btn" onClick={goToRecoverPassword}>
              <span role="img" aria-label="contraseña">🔒</span> Cambiar Contraseña
            </button>
            <button className="profile-action-btn" onClick={() => navigate("/logout")}>Cerrar Sesión</button>
          </div>
        </div>
      </div>
      {editMode && (
        <div className="profile-edit-modal">
          <form className="profile-edit-form" onSubmit={handleSave}>
            <h3>Editar Perfil</h3>
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label>Usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label>Correo</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Teléfono</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <label>Foto de perfil</label>
            <div className="profile-img-options">
              {profileImages.map((img) => (
                <img
                  key={img.key}
                  src={img.src}
                  alt={img.key}
                  className={`profile-img-option${formData.profileImg === img.key ? " selected" : ""}`}
                  style={{ width: 60, height: 60, borderRadius: "50%", margin: "0 8px", cursor: "pointer", border: formData.profileImg === img.key ? "2px solid #F26C1F" : "2px solid transparent" }}
                  onClick={() => handleImgChange(img.key)}
                />
              ))}
            </div>
            <div className="profile-edit-actions">
              <button type="submit" className="save-btn">Guardar</button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
