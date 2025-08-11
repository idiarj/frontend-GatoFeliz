import { useState } from 'react';
import { FaHome, FaSignInAlt, FaUserPlus, FaQuestionCircle, FaDonate, FaCat, FaPaw, FaStethoscope, FaUserShield } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { fetchInstance } from '../../utils/Fetch';
import { useUser } from '../../hooks/useUser';
import './menu.css';

const logout = async () => {
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

const menuOptions = [
  { label: 'Inicio', icon: <FaHome />, path: '/dashboard', session: 'indiferent'},
  { label: 'Iniciar Sesión', icon: <FaSignInAlt />, path: '/login', session: false }, 
  { label: 'Registrarse', icon: <FaUserPlus />, path: '/register', session: false },
  { label: '¿Qué Hacemos?', icon: <FaQuestionCircle />, path: '/aboutUs', session: 'indiferent' },
  { label: 'Donaciones', icon: <FaDonate />, path: '/donations', session: 'indiferent' },
  { label: 'Adopciones', icon: <FaCat />, path: '/adoption', session: 'indiferent' },
  { label: 'Apadrinar', icon: <FaPaw />, path: '/apadrinar', session: 'indiferent' },
  { label: 'Preguntas', icon: <FaQuestionCircle />, path: '/questions', session: 'indiferent' },
  { label: 'Mis Gatos', icon: <FaCat />, path: '/misgatos', session: true },
  {label: `Cerrar sesion`, icon: <FaSignInAlt />, path: '/login', onClick: logout, session: true},
  { label: 'Panel Medico', icon: <FaStethoscope />, path: '/panelMedico', session: true, needed_profiles: [1, 2]},
  {label: 'Administracion', icon: <FaUserShield />, path: '/admin', session: true, needed_profiles: [1]}
];

const Menu = () => {
  const location = useLocation();
  const {user} = useUser();
  console.log(user);
  return (
    <nav className="menu-nav">
      <div className="menu-title">
        <span>MENU</span>
      </div>
      <ul className="menu-list">
        {menuOptions.map(opt => {
          const isActive = location.pathname === opt.path;
          // Filtrado de opciones según sesión y perfil
          // if (user && opt.session === false) return null;
          // if (!user && opt.session === true) return null;
          // if (user && opt.needed_profiles && !opt.needed_profiles.includes(user.id_perfil)) return null;
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
