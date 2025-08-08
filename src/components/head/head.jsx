import { IoCall, IoLogoInstagram, IoSearch } from 'react-icons/io5';
import { useUser } from '../../hooks/useUser.jsx';
import Logo from '../logo.jsx';
import Menu from '../menu/menu.jsx';
import './head.css';

const Head = ({ showSearch = false, onSearch }) => {
  const { user } = useUser();

  return (
    <div className="head-container">
      <div className="head-left">
        <Menu />
        <h1 className="head-title">
          {user && user.nom_usuario ? `Bienvenido a Gato Feliz Venezuela, ${user.nom_usuario}!` : "Bienvenido a Gato Feliz Venezuela!"}
          </h1>
      </div>
      <div className="head-right">
        {showSearch && (
          <>
              <div className="head-search">
                <IoSearch className="head-search-icon" />
                <input
                  type="text"
                  placeholder="Buscar por nombre..."
                  className="head-search-input"
                  onChange={e => onSearch && onSearch(e.target.value)}
                />
              </div>
            <div className="head-contact">
              <div className="head-contact-title">CONTACTO</div>
              <div className="head-contact-row">
                <IoCall className="head-contact-icon" />
                <span className="head-contact-text">0414 640-7460</span>
              </div>
              <div className="head-contact-row">
                <IoLogoInstagram className="head-contact-icon" />
                <span className="head-contact-text">gatofelizvenezuela</span>
              </div>
            </div>
          </>
        )}
        <Logo width={100} height={100} className="head-logo" />
      </div>
    </div>
  );
};

export default Head;
