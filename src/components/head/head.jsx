import { IoCall, IoLogoInstagram } from 'react-icons/io5';
import Logo from '../logo.jsx';
import Menu from '../menu/menu.jsx';


import './head.css';

const Head = ({ title }) => {
  return (
    <div className="head-container">
      <div className="head-left">
        <Menu />
        <h1 className="head-title">{title}</h1>
      </div>
      <div className="head-right">
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
        <Logo width={100} height={100} className="head-logo" />
      </div>
    </div>
  );
};

export default Head;
