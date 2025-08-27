import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import tabby from "../../../assets/perfil/tabby.png";
import tuxedo from "../../../assets/perfil/tuxedo.png";
import carey from "../../../assets/perfil/carey.png";
import amarillo from "../../../assets/perfil/amarillo.png";
import siames from "../../../assets/perfil/siames.png";
import blanco from "../../../assets/perfil/blanco.png";

/** Si luego conectas tu UserContext, solo reemplaza mockUser y updateUser */
const profileImages = [
  { key: "tabby.png", src: tabby, alt: "Gato Atigrado" },
  { key: "tuxedo.png", src: tuxedo, alt: "Gato Tuxedo" },
  { key: "carey.png", src: carey, alt: "Gato Carey" },
  { key: "amarillo.png", src: amarillo, alt: "Gato Amarillo" },
  { key: "siames.png", src: siames, alt: "Gato Siamés" },
  { key: "blanco.png", src: blanco, alt: "Gato Blanco" }
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
    // Aquí conectas tu update real (contexto/endpoint)
    console.log("Actualizar usuario:", data);
  };

  const [editMode, setEditMode] = useState(false);
  const [showImgOptions, setShowImgOptions] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
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

  const goToRecoverPassword = () => navigate("/recoverpassword");

  return (
    <div className="profile-main-container" role="main">
      <div className="profile-content">
        {/* ===== Columna Izquierda (Perfil) ===== */}
        <section className="profile-left" aria-labelledby="profile-heading">
          {/* Cabecera del perfil */}
          <header className="profile-header">
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

                        {/* Cabecera del perfil reorganizada */}
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
                    right: 0,
                    background: "#fff",
                    borderRadius: "50%",
                    padding: 6,
                    border: "1px solid #ddd",
                    cursor: "pointer",
                    boxShadow: "0 6px 14px rgba(0,0,0,.12)"
                  }}
                >
                  ✏️
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

<h2 id="profile-heading" className="profile-title" style={{ color: "#F26C1F", marginTop: 12 }}>
  {editMode ? (
    <>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        aria-label="Nombre"
        className="profile-title-input"
        style={{ fontSize: "1.5rem", fontWeight: 800, border: "none", outline: "none" }}
      />
    </>
  ) : (
    <>
      {formData.name}
    </>
  )}
</h2>
          </header>

          {/* Información / Form */}
              <form className="profile-info-card" onSubmit={handleSave} noValidate>
                {/* Nombre y usuario en la misma línea */}
                <div className="profile-info-item" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span aria-hidden="true">👤</span>
                  <div style={{ flex: 1 }}>
                    <div className="profile-label">Nombre</div>
                    {editMode ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                      />
                    ) : (
                      <div>{formData.name}</div>
                    )}
                  </div>
                  <span aria-hidden="true">🏷️</span>
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
                </div>

                {/* Correo y teléfono en la misma línea */}
                <div className="profile-info-item" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span aria-hidden="true">📧</span>
                  <div style={{ flex: 1 }}>
                    <div className="profile-label">Correo</div>
                    {editMode ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                    ) : (
                      <div>{formData.email}</div>
                    )}
                  </div>
                  <span aria-hidden="true" style={{ marginLeft: 16 }}>📞</span>
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
              ✏️ Editar Perfil
            </button>

            <button className="profile-action-btn" type="button" onClick={goToRecoverPassword}>
              🔒 Cambiar Contraseña
            </button>

            <button className="profile-action-btn" type="button" onClick={() => navigate("/logout")}> 
              🚪 Cerrar Sesión
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Profile;
