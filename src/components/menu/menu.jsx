import { useState } from 'react';
import './menu.css';
import { FaHome, FaSignInAlt, FaUserPlus, FaQuestionCircle, FaDonate, FaCat, FaPaw, FaStethoscope } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { fetchInstance } from '../../utils/Fetch';


const menuOptions = [
  { label: 'Inicio', icon: <FaHome />, path: '/dashboard' },
  { label: 'Iniciar Sesión', icon: <FaSignInAlt />, path: '/login' },
  { label: 'Registrarse', icon: <FaUserPlus />, path: '/register' },
  { label: '¿Qué Hacemos?', icon: <FaQuestionCircle />, path: '/aboutUs' },
  { label: 'Donaciones', icon: <FaDonate />, path: '/donations' },
  { label: 'Adopciones', icon: <FaCat />, path: '/adoption' },
  { label: 'Apadrinar', icon: <FaPaw />, path: '/apadrinar' },
  { label: 'Preguntas', icon: <FaQuestionCircle />, path: '/questions' },
  { label: 'Mis Gatos', icon: <FaCat />, path: '/misgatos' },
  { label: 'Panel Medico', icon: <FaStethoscope />, path: '/panelMedico' },
  {label: `Cerrar sesion`, icon: <FaSignInAlt />, path: '/login', onClick: async () => {
    // Aquí puedes manejar el cierre de sesión, por ejemplo, limpiando el estado del usuario
      console.log('Cerrar sesión');
      // Redirigir a la página de inicio o login
      const response = await fetchInstance.post({
        endpoint: '/auth/logout',
        credentials: 'include'
      });
      console.log('Respuesta del servidor:', response);
      const data = await response.json();
      console.log('Datos recibidos:', data);
      if (response.ok) {
        console.log('Sesión cerrada');
        // Redirigir a la página de inicio o login
      } else {
        console.error('Error al cerrar sesión', );
      }
    }
  }
];

const Menu = () => {
  const location = useLocation();
  return (
    <nav className="menu-nav">
      <div className="menu-title">
        <span>MENU</span>
      </div>
      <ul className="menu-list">
        {menuOptions.map(opt => {
          const isActive = location.pathname === opt.path;
          return (
            <li key={opt.label} className="menu-list-item">
              <MenuLink
                to={opt.path}
                isActiveBg={isActive}
                onClick={opt.onClick}
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
  let linkClass = 'menu-link';
  if (isActiveBg) linkClass += ' active';
  if (hover) linkClass += ' hover';
  return (
    <Link
      to={to}
      className={linkClass}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Menu;
