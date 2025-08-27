import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaUserCircle, FaEnvelope, FaPhone, FaLock, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import tabby from "../../../assets/perfil/tabby.png";
import tuxedo from "../../../assets/perfil/tuxedo.png";
import carey from "../../../assets/perfil/carey.png";
import amarillo from "../../../assets/perfil/amarillo.png";
import siames from "../../../assets/perfil/siames.png";
import blanco from "../../../assets/perfil/blanco.png";
import negro from "../../../assets/perfil/negro.png";
import esterilizarImg from "../../../assets/images/esterilizar.png"


/** Si luego conectas tu UserContext, solo reemplaza mockUser y updateUser */
const profileImages = [
  { key: "tabby.png", src: tabby, alt: "Gato Atigrado" },
  { key: "tuxedo.png", src: tuxedo, alt: "Gato Tuxedo" },
  { key: "carey.png", src: carey, alt: "Gato Carey" },
  { key: "amarillo.png", src: amarillo, alt: "Gato Amarillo" },
  { key: "siames.png", src: siames, alt: "Gato Siamés" },
  { key: "blanco.png", src: blanco, alt: "Gato Blanco" },
  { key: "negro.png", src: negro, alt: "Gato Negro" }
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
  const user = mockUser;
  const updateUser = (data) => {
    console.log("Actualizar usuario:", data);
  };

  const [editMode, setEditMode] = useState(false);
  const [showImgOptions, setShowImgOptions] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    phone: user.phone,
    profileImg: user.profileImg
  });

  const navigate = useNavigate();

  const currentImg = profileImages.find((i) => i.key === formData.profileImg);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImgChange = (imgKey) => {
    setFormData((prev) => ({ ...prev, profileImg: imgKey }));
    setShowImgOptions(false);
  };

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setEditMode(false);
    setShowImgOptions(false);
    // Restablece a los datos del usuario actual (mock o contexto)
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      profileImg: user.profileImg
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(formData);
    setEditMode(false);
    setShowImgOptions(false);
  };

const goToRecoverPassword = () => navigate("/auth/recoverPassword");

  return (
    <div className="profile-main-container" role="main">
  <div className="profile-content">
        {/* ===== Columna Izquierda (Perfil) ===== */}
        <section className="profile-left" aria-labelledby="profile-heading">
          {/* Cabecera del perfil */}
          <header className="profile-header">
            <div className="profile-avatar-row" style={{ display: "flex", alignItems: "center", gap: "22px" }}>
              <div className="profile-avatar-wrap" style={{ position: "relative", display: "inline-block" }}>
                <button
                  type="button"
                  className="avatar-button"
                  aria-label={editMode ? "Cambiar foto de perfil" : "Foto de perfil"}
                  onClick={() => editMode && setShowImgOptions((v) => !v)}
                  style={{ background: "transparent", border: 0, padding: 0, cursor: editMode ? "pointer" : "default" }}
                >
                  <img
                    src={currentImg?.src}
                    alt={currentImg?.alt || "Foto de perfil"}
                    className="profile-img"
                  />
                </button>

                {editMode && (
                  <button
                    type="button"
                    className="avatar-fab"
                    title="Cambiar foto"
                    aria-haspopup="listbox"
                    aria-expanded={showImgOptions}
                    onClick={() => setShowImgOptions((v) => !v)}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: -16,
                      padding: 6,
                      cursor: "pointer",
                      background: "transparent",
                      border: 0
                    }}
                  >
                    <FiEdit size={24} color="#F26C1F" />
                  </button>
                )}

                {/* Popover selección de imagen */}
                {editMode && showImgOptions && (
                  <div
                    className="profile-img-options"
                    role="listbox"
                    aria-label="Seleccionar imagen de perfil"
                    style={{ position: "absolute", top: "100%", left: 0 }}
                  >
                    {profileImages.map((img) => {
                      const selected = formData.profileImg === img.key;
                      return (
                        <button
                          key={img.key}
                          type="button"
                          role="option"
                          aria-selected={selected}
                          tabIndex={0}
                          className={`profile-img-option${selected ? " selected" : ""}`}
                          onClick={() => handleImgChange(img.key)}
                          title={img.alt}
                          style={{ border: 0, padding: 0, background: "transparent" }}
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            style={{ width: 40, height: 40, borderRadius: "50%" }}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              {/* Nombre eliminado, solo se muestra el username */}
              <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#F26C1F" }}>@{formData.username}</span>
            </div>
          </header>

          {/* Información / Form */}

              <form className="profile-info-card" onSubmit={handleSave} noValidate>
                {/* Usuario y teléfono en la misma línea */}
                <div className="profile-info-item" style={{ display: "flex", alignItems: "center", gap: 32 }}>
                  {/* Usuario */}
                  <FaUserCircle className="profile-icon user" style={{ fontSize: 22, color: "#F26C1F" }} />
                  <div style={{ flex: 1 }}>
                    <div className="profile-label">Usuario</div>
                    {editMode ? (
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete="username"
                      />
                    ) : (
                      <div>@{formData.username}</div>
                    )}
                  </div>
                  {/* Teléfono */}
                  <FaPhone className="profile-icon phone" style={{ fontSize: 22, color: "#F26C1F", marginLeft: 16 }} />
                  <div style={{ flex: 1 }}>
                    <div className="profile-label">Teléfono</div>
                    {editMode ? (
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        inputMode="tel"
                        autoComplete="tel"
                      />
                    ) : (
                      <div>{formData.phone}</div>
                    )}
                  </div>
                </div>

                {/* Correo debajo */}
                <div className="profile-info-item" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <FaEnvelope className="profile-icon email" style={{ fontSize: 22, color: "#F26C1F" }} />
                  <div style={{ flex: 1 }}>
                    <div className="profile-label">Correo</div>
                    {editMode ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        maxLength={80}
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <div>{formData.email}</div>
                    )}
                  </div>
                </div>

            {/* Acciones de edición */}
            {editMode && (
              <div className="profile-edit-actions" style={{ marginTop: 8 }}>
                <button className="save-btn" type="submit">Guardar cambios</button>
                <button className="cancel-btn" type="button" onClick={handleCancel}>
                  Cancelar
                </button>
              </div>
            )}
          </form>
        </section>

        {/* ===== Columna Derecha (Acciones) ===== */}
        <aside className="profile-right" aria-label="Acciones rápidas">
          <div className="profile-actions-card">
            <div className="profile-actions-title">ACCIONES RÁPIDAS</div>

            <button className="profile-action-btn" type="button" onClick={handleEdit}>
                <FiEdit className="profile-icon edit" style={{ fontSize: 22, color: "#F26C1F", marginRight: 8 }} /> Editar Perfil
            </button>

            <button className="profile-action-btn" type="button" onClick={goToRecoverPassword}>
              <FaLock className="profile-icon lock" style={{ fontSize: 22, color: "#F26C1F", marginRight: 8 }} /> Cambiar Contraseña
            </button>

            <button className="profile-action-btn" type="button" onClick={() => navigate("/logout")}> 
              <FaSignOutAlt className="profile-icon logout" style={{ fontSize: 22, color: "#F26C1F", marginRight: 8 }} /> Cerrar Sesión
            </button>
          </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: -10 }}>
              <img src={esterilizarImg} alt="Esterilizar" style={{ maxWidth: "230px", height: "auto" }} />
            </div>
        </aside>
      </div>
    </div>
  );
};

export default Profile;
