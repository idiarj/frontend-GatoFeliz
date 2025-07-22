import React, { useState } from 'react';
import { FaChevronRight, FaChevronLeft, FaHome, FaSignInAlt, FaUserPlus, FaQuestionCircle, FaDonate, FaCat, FaPaw, FaInstagram, FaPhone } from 'react-icons/fa';
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
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.18)',
            zIndex: 99,
            transition: 'background 0.2s',
          }}
        />
      )}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed',
            top: 10,
            left: 0,
            zIndex: 120,
            background: '#fff',
            color: '#F37021',
            border: 'none',
            borderTopRightRadius: 28,
            borderBottomRightRadius: 28,
            minWidth: 54,
            height: 54,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 10,
            boxShadow: '2px 0 8px 0 rgba(0,0,0,0.08)',
            cursor: 'pointer',
            transition: 'background 0.18s, box-shadow 0.18s',
            outline: 'none',
            fontWeight: 'bold',
            fontSize: 20,
            padding: '0 18px 0 10px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
          onMouseOver={e => e.currentTarget.style.background = '#ffe2b8'}
          onMouseOut={e => e.currentTarget.style.background = '#fff'}
        >
          <FaChevronRight size={28} />
          <span style={{marginLeft: 4, fontSize: 18, fontWeight: 600, letterSpacing: 1}}>MENU</span>
        </button>
      )}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: open ? 0 : -240,
          height: '100vh',
          width: 220,
          background: '#fff',
          borderTopRightRadius: 18,
          borderBottomRightRadius: 18,
          boxShadow: open ? '2px 0 16px 0 rgba(0,0,0,0.10)' : 'none',
          zIndex: 110,
          transition: 'left 0.28s cubic-bezier(.4,1.3,.6,1)',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 0,
        }}
      >
        {open && (
          <button
            onClick={() => setOpen(false)}
            style={{
              margin: '32px 0 18px 24px',
              background: 'transparent',
              color: '#F37021',
              border: 'none',
              borderRadius: 28,
              minWidth: 90,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 10,
              boxShadow: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: 20,
              padding: '0 22px',
              outline: 'none',
              transition: 'background 0.18s',
            }}
            onMouseOver={e => e.currentTarget.style.background = '#ffe2b8'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}
          >
            <FaChevronLeft size={28} />
            <span>MENU</span>
          </button>
        )}
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
                  onClick={() => setOpen(false)}
                >
                  {opt.icon} {opt.label}
                </MenuLink>
              </li>
            );
          })}
        </ul>
      </nav>
        </>
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
          ? 'linear-gradient(90deg, #f7b95b 0%, #F37021 100%)'
          : isActiveBg
            ? '#fff9db'
            : 'transparent',
        borderRadius: hover ? 12 : isActiveBg ? 8 : 0,
        boxShadow: hover ? '0 2px 8px 0 rgba(243,112,33,0.08)' : 'none',
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
