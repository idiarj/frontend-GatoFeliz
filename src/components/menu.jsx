import React, { useState } from 'react';
import { FaChevronRight, FaChevronLeft, FaHome, FaSignInAlt, FaUserPlus, FaQuestionCircle, FaDonate, FaCat, FaPaw, FaInstagram, FaStethoscope } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const menuOptions = [
  { label: 'Inicio', icon: <FaHome />, path: '/dashboard' },
  { label: 'Iniciar Sesión', icon: <FaSignInAlt />, path: '/login' },
  { label: 'Registrarse', icon: <FaUserPlus />, path: '/register' },
  { label: '¿Qué Hacemos?', icon: <FaQuestionCircle />, path: '/aboutUs' },
  { label: 'Donaciones', icon: <FaDonate />, path: '/donations' },
  { label: 'Adopciones', icon: <FaCat />, path: '/adopciones' },
  { label: 'Apadrinar', icon: <FaPaw />, path: '/apadrinar' },
  { label: 'Preguntas', icon: <FaQuestionCircle />, path: '/questions' },
  { label: 'Mis Gatos', icon: <FaCat />, path: '/misgatos' },
  { label: 'Panel Medico', icon: <FaStethoscope />, path: '/panelMedico' },
];

const Menu = () => {
  const location = useLocation();
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: 220,
        background: '#fff',
        boxShadow: '2px 0 16px 0 rgba(0,0,0,0.10)',
        zIndex: 110,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 0,
      }}
    >
      <div style={{
        margin: '32px 0 18px 24px',
        color: '#F37021',
        fontWeight: 'bold',
        fontSize: 22,
        letterSpacing: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <span>MENU</span>
      </div>
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {menuOptions.map(opt => {
          const isActive = location.pathname === opt.path;
          return (
            <li key={opt.label} style={{width: '100%'}}>
              <MenuLink
                to={opt.path}
                isActiveBg={isActive}
              >
                {opt.icon} {opt.label}
              </MenuLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
    
// Componente para manejar el hover y estilos de las opciones
const MenuLink = ({ to, children, isActiveBg, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '1rem 1.5rem',
        color: hover ? '#fff' : isActiveBg ? '#F37021' : '#F37021',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: 18,
        background: hover
          ? '#f8cfbaff'
          : isActiveBg
            ? '#fff9db'
            : 'transparent',
        borderRadius: hover ? 12 : isActiveBg ? 8 : 0,
        boxShadow: hover ? '0 2px 8px 0 #ffe0d1' : 'none',
        transition: 'background 0.18s, color 0.18s, border-radius 0.18s',
        marginBottom: 2,
        fontStyle: isActiveBg ? 'italic' : 'normal',
        fontWeight: isActiveBg ? 900 : 'bold',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Menu;
