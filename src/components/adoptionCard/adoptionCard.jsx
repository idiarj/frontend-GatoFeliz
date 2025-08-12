import { MdIosShare, MdDeleteOutline } from 'react-icons/md';
import './adoptionCard.css';
import { useUser } from '../../hooks/useUser';

const AdoptionCard = ({
  name,
  gender,
  age,
  image,
  onRequest,
  onDelete, // <-- Nueva prop para manejar la acción de eliminar
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
      <div className="adoption-card-content">
        <h3 className="adoption-card-title">{name}</h3>
        <p className="adoption-card-subtitle">
          {gender} &bull; {age}
        </p>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px', width: '100%'}}>
          <button
            className="adoption-card-button adoption-card-button-large"
            onClick={onRequest}
          >
            {buttonLabel}
          </button>
          <button
            className="adoption-card-icon-btn"
            onClick={handleCopyLink}
            title="Compartir"
          >
            <MdIosShare size={22} color="#FF9800" />
          </button>
          {
            (testing || (user && (user.id_perfil === 1 || user.id_perfil === 2))) && (
              <button
                className="adoption-card-icon-btn"
                onClick={onDelete}
                title="Eliminar"
              >
                <MdDeleteOutline size={22} color="#F44336" />
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default AdoptionCard;
