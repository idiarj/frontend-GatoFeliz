import { MdIosShare, MdDeleteOutline } from 'react-icons/md';
import { useUser } from '../../hooks/useUser';
import Modal from '../modal/Modal';
import { useState } from 'react';
import './catCard.css'
import { Link } from 'react-router-dom';

const CatCard = ({
  name,
  gender,
  age,
  image,
  onRequest,
  onDelete, // <-- Nueva prop para manejar la acción de eliminar
  buttonLabel = 'ENVIAR SOLICITUD',
  boxShadow = true,
  fromSponsor,
}) => {
  const pageUrl = `${window.location.origin}/adopcion/${encodeURIComponent(name)}`;
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useUser();

  // Elimina lógica innecesaria de modalContent
  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    alert('¡Enlace copiado! Puedes compartirlo donde quieras.');
  };

  const handleRequestClick = (e) => {
    e.preventDefault();
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowModal(true);
    }
  };

  const handleConfirmRequest = () => {
    setShowModal(false);
    if (onRequest) onRequest();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowAuthModal(false);
  };

  let testing = import.meta.env.VITE_TESTING === 'true';

  // Determina si el usuario puede eliminar (admin)
  const canDelete = testing || (user && (user.id_perfil === 1 || user.id_perfil === 2));
  const buttonMarginLeft = canDelete ? 18 : 75;

  return (
    <>
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
        <div className="adoption-card-content" style={{ background: fromSponsor ? '#ffe9ce': '#fffdce'}}>
          <h3 className="adoption-card-title">{name}</h3>
          <p className="adoption-card-subtitle">
            {gender} &bull; {age}
          </p>
          <div className="adoption-card-actions-row">
            {canDelete && (
              <button
                className="adoption-card-icon-btn adoption-card-delete-btn"
                onClick={onDelete}
                title="Eliminar"
              >
                <MdDeleteOutline size={22} color="#F44336" />
              </button>
            )}
            <button
              className="adoption-card-button adoption-card-button-large"
              onClick={handleRequestClick}
              style={{ marginLeft: buttonMarginLeft }}
            >
              {buttonLabel}
            </button>
            <button
              className="adoption-card-icon-btn adoption-card-share-btn"
              onClick={handleCopyLink}
              title="Compartir"
            >
              <MdIosShare size={22} color="#FF9800" />
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <h3>¿Estás seguro que deseas enviar la solicitud por {name}?</h3>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: 24 }}>
            <button onClick={handleCloseModal} style={{ background: '#ccc', color: '#333', border: 'none', borderRadius: 8, padding: '8px 18px', cursor: 'pointer' }}>Cancelar</button>
            <button onClick={handleConfirmRequest} style={{ background: '#f37021', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', cursor: 'pointer' }}>Sí, enviar</button>
          </div>
        </Modal>
      )}
      {showAuthModal && (
        <Modal onClose={handleCloseModal}>
          <h3 style={{marginTop: '40px'}}>Debes iniciar sesión para enviar una solicitud</h3>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: 24, justifySelf: 'center', bottom: '50px'}}>
            <Link to="/auth/login" style={{  background: '#f37021', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>Iniciar sesión</Link>
            <Link to="/auth/register" style={{ background: '#ccc', color: '#333', border: 'none', borderRadius: 8, padding: '8px 18px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>Registrarse</Link>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CatCard;
