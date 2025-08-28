import { useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { logout } from '../../api/Auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaUserPlus, FaQuestionCircle, FaDonate, FaCat, FaPaw, FaStethoscope, FaUserShield } from 'react-icons/fa';
import './menu.css';


const handleLogout = async (setUser, navigate) => {
  try {
          console.log('Cerrar sesión');
      // Redirigir a la página de inicio o login
      const data = await logout();
      if (data.success) {
        console.log('Sesión cerrada');
        setUser(null); // Limpiar el estado del usuario
        // Redirigir a la página de inicio o login
        navigate('/auth/login');
      } else {
        console.error('Error al cerrar sesión', data.errorMsg);
      }
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
    // Aquí puedes manejar el cierre de sesión, por ejemplo, limpiando el estado del usuario

}

const menuOptions = [
  { label: 'Inicio', icon: <FaHome />, path: '/dashboard', session: 'indiferent'},
  { label: 'Perfil', icon: <FaUserPlus />, path: '/profile', session: true },
  { label: 'Iniciar Sesion', icon: <FaSignInAlt />, path: '/auth/login', session: false }, 
  { label: 'Registrarse', icon: <FaUserPlus />, path: '/auth/register', session: false },
  { label: '¿Qué Hacemos?', icon: <FaQuestionCircle />, path: '/aboutUs', session: 'indiferent' },
  { label: 'Donaciones', icon: <FaDonate />, path: '/donations', session: 'indiferent' },
  { label: 'Adopciones', icon: <FaCat />, path: '/adoption', session: 'indiferent' },
  { label: 'Apadrinar', icon: <FaPaw />, path: '/apadrinar', session: 'indiferent' },
  { label: 'Preguntas', icon: <FaQuestionCircle />, path: '/questions', session: 'indiferent' },
  { label: 'Mis Gatos', icon: <FaCat />, path: '/tusGatos', session: true },
  {label: `Cerrar sesion`, icon: <FaSignInAlt />, path: '/auth/login', onClick: handleLogout, session: true},
  { label: 'Panel Medico', icon: <FaStethoscope />, path: '/medical', session: true, needed_profiles: [1, 2]},
  {label: 'Administración', icon: <FaUserShield />, path: '/administration', session: true, needed_profiles: [1]}
  ];

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { user, setUser } = useUser();
  let testing = import.meta.env.VITE_TESTING === 'true';
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
          if ((user && opt.session === false) && !testing) return null;
          if ((!user && opt.session === true) && !testing) return null;
          if ((user && opt.needed_profiles && !opt.needed_profiles.includes(user.id_perfil)) && !testing) return null;
          return (
            <li key={opt.label} className="menu-list-item">
              <MenuLink
                to={opt.path}
                isActiveBg={isActive}
                onClick={opt.onClick ? () => opt.onClick(setUser, navigate) : undefined}
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
    const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();   // ← evita que <Link> navegue
      e.stopPropagation();
      onClick();            // ← ejecuta tu logout (hará navigate internamente)
    }
  };
  return (

    <Link
      to={to}
      className={linkClass}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default Menu;
