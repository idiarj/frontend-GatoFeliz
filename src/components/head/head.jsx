import { IoCall, IoLogoInstagram, IoSearch } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../logo.jsx';
import './head.css';

const Head = ({ title, onSearch }) => {
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  console.log(location.pathname);
  useEffect(() => {
    if (location.pathname === '/adoption' || location.pathname === '/apadrinar') {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [location.pathname]);

  return (
    <div className="head-container">

        <h1 className="head-title">{title}</h1>

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
          </>
        )}
            <div className="head-contact">
              <div className="head-contact-title">CONTACTO</div>
              <div className="head-contact-row">
                <IoCall className="head-contact-icon" />
                <span className="head-contact-text">0414 640-7460</span>
              </div>
              <div className="head-contact-row">
                <IoLogoInstagram className="head-contact-icon" />
                <span className="head-contact-text"><a className="head-contact-link" href="https://www.instagram.com/gatofelizvenezuela/" target="_blank" rel="noopener noreferrer">gatofelizvenezuela</a></span>
              </div>
            </div>
        <Logo width={100} height={100} className="head-logo" />
      </div>
    </div>
  );
};

export default Head;
