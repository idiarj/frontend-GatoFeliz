import { MdIosShare, MdDeleteOutline } from 'react-icons/md';
import './sponsorCard.css';
import { useUser } from '../../hooks/useUser';


const SponsorCard = ({
  name,
  gender,
  age,
  image,
  onRequest,
  onDelete, 
  buttonLabel = 'ENVIAR SOLICITUD',
  boxShadow = true
}) => {
  const pageUrl = `${window.location.origin}/adopcion/${encodeURIComponent(name)}`;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    alert('¡Enlace copiado! Puedes compartirlo donde quieras.');
  };

  const { user } = useUser();
  let testing = import.meta.env.VITE_TESTING === 'true';

  return (
    <div
      className="sponsor-card"
      style={boxShadow ? { boxShadow: '0 4px 16px rgba(0,0,0,0.15)' } : { boxShadow: 'none' }}
    >
      <div className="sponsor-card-image-wrapper">
        <img
          src={image}
          alt={name}
          className="sponsor-card-image"
        />
      </div>
      <div className="sponsor-card-content">
        <h3 className="sponsor-card-title">{name}</h3>
        <p className="sponsor-card-subtitle">
          {gender} &bull; {age}
        </p>
        <div className="sponsor-card-actions-row" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          {(testing || (user && (user.id_perfil === 1 || user.id_perfil === 2))) && (
            <button
              className="sponsor-card-icon-btn sponsor-card-delete-btn"
              onClick={onDelete}
              title="Eliminar"
            >
              <MdDeleteOutline size={22} color="#F44336" />
            </button>
          )}
          <button
            className="sponsor-card-button sponsor-card-button-large"
            onClick={onRequest}
          >
            {buttonLabel}
          </button>
          <button
            className="sponsor-card-icon-btn sponsor-card-share-btn"
            onClick={handleCopyLink}
            title="Compartir"
          >
            <MdIosShare size={22} color="#FF9800" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SponsorCard;
