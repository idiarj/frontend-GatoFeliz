import "./profile.css";
import { useState, useRef, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { FaUserCircle, FaEnvelope, FaPhone, FaLock, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { updateUser } from "../../../api/Auth";
import { useLoaderData } from "react-router-dom";
import { logout } from "../../../api/Auth";
import { getTypeCat } from "../../../utils/getTypeCat";
import tabby_full from "../../../assets/perfil/full/tabby_full.png";
import tuxedo_full from "../../../assets/perfil/full/tuxedo_full.png";
import carey_full from "../../../assets/perfil/full/carey_full.png";
import amarillo_full from "../../../assets/perfil/full/orange_full.png";
import siames_full from "../../../assets/perfil/full/siames_full.png";
import blanco_full from "../../../assets/perfil/full/white_full.png";
import negro_full from "../../../assets/perfil/full/black_full.png";

const secondaryImages = {
  tabby: tabby_full,
  tuxedo: tuxedo_full,
  carey: carey_full,
  orange: amarillo_full,
  siames: siames_full,
  white: blanco_full,
  black: negro_full,
};


/** Si luego conectas tu UserContext, solo reemplaza mockUser y updateUser */
const profileImages = [
  { key: 'https://res.cloudinary.com/dqc0yku26/image/upload/v1756355363/gatoFeliz/icons/cat_tabby_cat.png', alt: "Gato Atigrado", name: 'tabby' },
  { key: 'https://res.cloudinary.com/dqc0yku26/image/upload/v1756355363/gatoFeliz/icons/cat_tuxedo_cat.png', alt: "Gato Tuxedo", name: 'tuxedo' },
  { key: 'https://res.cloudinary.com/dqc0yku26/image/upload/v1756355363/gatoFeliz/icons/cat_carey_cat.png', alt: "Gato Carey", name: 'carey' },
  { key: 'https://res.cloudinary.com/dqc0yku26/image/upload/v1756355363/gatoFeliz/icons/cat_orange_cat.png', alt: "Gato Amarillo", name: 'orange' },
  { key: 'https://res.cloudinary.com/dqc0yku26/image/upload/v1756355363/gatoFeliz/icons/cat_siames_cat.png', alt: "Gato Siamés", name: 'siames' },
  { key: 'https://res.cloudinary.com/dqc0yku26/image/upload/v1756355495/gatoFeliz/icons/cat_white_cat.png', alt: "Gato Blanco", name: 'white' },
  { key: 'https://res.cloudinary.com/dqc0yku26/image/upload/v1756355495/gatoFeliz/icons/cat_black_cat.png', alt: "Gato Negro", name: 'black' }
];

// Datos de ejemplo para pruebas
// const mockUser = {
//   name: "Victoria Acosta",
//   username: "vic_acosta",
//   email: "victoria@example.com",
//   phone: "0414-693-5805",
//   profileImg: "amarillo.png"
// };

const Profile = () => {
  const data = useLoaderData();
  const { setUser } = useUser();

  const [showPwdModal, setShowPwdModal] = useState(false); // NUEVO: estado modal
  const dismissBtnRef = useRef(null); // NUEVO: para enfoque accesible
  const [editMode, setEditMode] = useState(false);
  const [showImgOptions, setShowImgOptions] = useState(false);
  const [secondaryImgSrc, setSecondaryImgSrc] = useState(null);
  const [formData, setFormData] = useState({
    id_usuario: data.id_usuario,
    nom_usuario: data.nom_usuario,
    email_usuario: data.email_usuario,
    tlf_usuario: data.tlf_usuario,
    img_usuario_url: data.img_usuario_url
  });


  useEffect(() => {
    const type = getTypeCat(formData.img_usuario_url);
    setSecondaryImgSrc(secondaryImages[type] || null);
  }, [formData.img_usuario_url]);

  console.log(secondaryImgSrc);

  const navigate = useNavigate();
  const openPwdModal = () => setShowPwdModal(true);
  const closePwdModal = () => setShowPwdModal(false);

    // NUEVO: mock de logout + navegación a “recover password”
  const confirmPasswordChange = async () => {
    try {
      // Mock: aquí “cerrarías sesión”
      const data = await logout();
      if(!data.success){
        console.error('Error al cerrar sesión.');
        return;
      }
      setUser(null);
      await new Promise((r) => setTimeout(r, 250)); // simula I/O
      // Mock: ir a vista de cambio de contraseña
      navigate("/auth/recoverPassword");
    } catch (e) {
      console.error("Error cerrando sesión (mock):", e);
    }
  };

  // NUEVO: mover la lógica del botón antiguo a abrir modal
  const goToRecoverPassword = () => openPwdModal();

  // NUEVO: Accesibilidad — enfocar botón cancelar al abrir
  useEffect(() => {
    if (showPwdModal && dismissBtnRef.current) {
      dismissBtnRef.current.focus();
    }
  }, [showPwdModal]);

  // NUEVO: cerrar con ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && showPwdModal) closePwdModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showPwdModal]);

  const currentImg = profileImages.find((i) => i.key === formData.profileImg);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImgChange = (imgKey) => {
    setFormData((prev) => ({ ...prev, img_usuario_url: imgKey }));
    setShowImgOptions(false);
  };

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setEditMode(false);
    setShowImgOptions(false);
    // Restablece a los datos del usuario actual (mock o contexto)
    setFormData({
      id_usuario: data.id_usuario,
      nom_usuario: data.nom_usuario,
      email_usuario: data.email_usuario,
      tlf_usuario: data.tlf_usuario,
      img_usuario_url: data.img_usuario_url
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try{
        const data = await updateUser(formData);
        if(!data.success){
          console.error('Error al actualizar los datos.');
          return;
        }
        setUser(null);
        console.log(data);
        setUser(data.data);
        setEditMode(false);
        setShowImgOptions(false);
    }catch(error){
      console.error(error)
    }
  };

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
                    src={formData.img_usuario_url}
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
                      const selected = formData.img_usuario_url === img.key;
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
                            src={img.key}
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
              <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#F26C1F" }}>@{formData.nom_usuario}</span>
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
                        name="nom_usuario"
                        value={formData.nom_usuario}
                        onChange={handleChange}
                        autoComplete="username"
                      />
                    ) : (
                      <div>@{formData.nom_usuario}</div>
                    )}
                  </div>
                  {/* Teléfono */}
                  <FaPhone className="profile-icon phone" style={{ fontSize: 22, color: "#F26C1F", marginLeft: 16 }} />
                  <div style={{ flex: 1 }}>
                    <div className="profile-label">Teléfono</div>
                    {editMode ? (
                      <input
                        type="text"
                        name="tlf_usuario"
                        value={formData.tlf_usuario}
                        onChange={handleChange}
                        inputMode="tel"
                        autoComplete="tel"
                      />
                    ) : (
                      <div>{formData.tlf_usuario}</div>
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
                        name="email_usuario"
                        value={formData.email_usuario}
                        onChange={handleChange}
                        autoComplete="email"
                        maxLength={80}
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <div>{formData.email_usuario}</div>
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
              <FaLock className="profile-icon lock" style={{ fontSize: 22, color: "#F26C1F", marginRight: 8 }} />
              Cambiar Contraseña
            </button>

            <button className="profile-action-btn" type="button" onClick={() => navigate("/logout")}> 
              <FaSignOutAlt className="profile-icon logout" style={{ fontSize: 22, color: "#F26C1F", marginRight: 8 }} /> Cerrar Sesión
            </button>
          </div>
            {secondaryImgSrc && (
              <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 20 }}>
                <img src={secondaryImgSrc} alt="Imagen secundaria" style={{ width: 340, height: "auto" }} />
              </div>
            )}
        </aside>
      </div>
            {/* ====== NUEVO: MODAL CAMBIAR CONTRASEÑA ====== */}
      {showPwdModal && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={(e) => {
            // cerrar si hace click fuera del diálogo
            if (e.target.classList.contains("modal-backdrop")) closePwdModal();
          }}
        >
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pwd-modal-title"
            aria-describedby="pwd-modal-desc"
          >
            <h3 id="pwd-modal-title" className="modal-title">Cambiar contraseña</h3>
            <p id="pwd-modal-desc" className="modal-desc">
              Para cambiar tu contraseña, primero debes cerrar sesión. ¿Deseas cerrar sesión ahora?
            </p>

            <div className="modal-actions">
              <button
                ref={dismissBtnRef}
                className="modal-btn modal-btn-secondary"
                type="button"
                onClick={closePwdModal}
              >
                Cancelar
              </button>
              <button
                className="modal-btn modal-btn-primary"
                type="button"
                onClick={confirmPasswordChange}
              >
                Cerrar sesión y continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
