import React, { useState } from 'react';
import { FaHome, FaSignInAlt, FaUserPlus, FaQuestionCircle, FaDonate, FaCat, FaPaw } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const menuOptions = [
  { label: 'Inicio', icon: <FaHome />, path: '/' },
  { label: 'Iniciar Sesión', icon: <FaSignInAlt />, path: '/login' },
  { label: 'Registrarse', icon: <FaUserPlus />, path: '/register' },
  { label: '¿Qué Hacemos?', icon: <FaQuestionCircle />, path: '/quehacemos' },
  { label: 'Donaciones', icon: <FaDonate />, path: '/donaciones' },
  { label: 'Adopciones', icon: <FaCat />, path: '/adopciones' },
  { label: 'Apadrinar', icon: <FaPaw />, path: '/apadrinar' },
  { label: 'Preguntas', icon: <FaQuestionCircle />, path: '/preguntas' },
  { label: 'Mis Gatos', icon: <FaCat />, path: '/misgatos' },
];

const Menu = () => {
  const location = useLocation();

  return (
    <nav
      style={{
        width: '100%',
        background: '#fff',
        borderRadius: 14,
        marginTop: 8,
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '6px 0 6px 0',
        maxWidth: 180,
      }}
    >
      <span style={{
        color: '#F37021',
        fontWeight: 700,
        fontSize: 16,
        marginBottom: 10,
        letterSpacing: 1,
        alignSelf: 'flex-start',
        marginLeft: 14
      }}>
        MENU
      </span>
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
                {opt.icon} <span style={{fontSize: 14}}>{opt.label}</span>
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
        gap: 8,
        padding: '0.5rem 0.75rem',
        color: hover ? '#fff' : isActiveBg ? '#F37021' : '#F37021',
        textDecoration: 'none',
        fontWeight: isActiveBg ? 900 : 'bold',
        fontSize: 14,
        background: hover
          ? '#ffc19a'
          : isActiveBg
            ? '#fff9db'
            : 'transparent',
        borderRadius: hover ? 8 : isActiveBg ? 6 : 0,
        boxShadow: hover ? '0 2px 8px 0 rgba(243,112,33,0.08)' : 'none',
        transition: 'background 0.18s, color 0.18s, border-radius 0.18s',
        marginBottom: 1,
        fontStyle: isActiveBg ? 'italic' : 'normal',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      {/* Cambia el color de los íconos y texto a blanco en hover */}
      {React.Children.map(children, child => {
        if (typeof child === 'string' || typeof child === 'number') {
          return child;
        }
        if (React.isValidElement(child)) {
          // Si es un icono o span, cambia el color en hover
          return React.cloneElement(child, {
            style: {
              ...(child.props.style || {}),
              color: hover ? '#fff' : undefined,
            }
          });
        }
        return child;
      })}
    </Link>
  );
};

export default Menu;
