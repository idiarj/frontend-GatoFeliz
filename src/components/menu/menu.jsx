import { useMemo, useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { usePermissions } from '../../hooks/usePermissions';
import { logout } from '../../api/Auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaHome, FaSignInAlt, FaUserPlus, FaQuestionCircle,
  FaDonate, FaCat, FaPaw, FaStethoscope, FaUserShield
} from 'react-icons/fa';
import './menu.css';

/** Logout */
const handleLogout = async (setUser, navigate) => {
  try {
    const data = await logout();
    if (data?.success) {
      setUser(null);
      navigate('/auth/login');
    } else {
      console.error('Error al cerrar sesión', data?.errorMsg);
    }
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

/**
 * Menú:
 * - `session`: true (solo logueado), false (solo deslogueado), 'indiferent' (todos)
 * - `needed_permission`: string con el nombre EXACTO del permiso del backend (p.ej. "Panel Medico")
 */
const menuOptions = [
  { label: 'Inicio', icon: <FaHome />, path: '/dashboard', session: 'indiferent' },
  { label: 'Perfil', icon: <FaUserPlus />, path: '/profile', session: true },
  { label: 'Iniciar Sesion', icon: <FaSignInAlt />, path: '/auth/login', session: false },
  { label: 'Registrarse', icon: <FaUserPlus />, path: '/auth/register', session: false },
  { label: '¿Qué Hacemos?', icon: <FaQuestionCircle />, path: '/aboutUs', session: 'indiferent' },
  { label: 'Donaciones', icon: <FaDonate />, path: '/donations', session: 'indiferent' },
  { label: 'Adopciones', icon: <FaCat />, path: '/adoption', session: 'indiferent' },
  { label: 'Apadrinar', icon: <FaPaw />, path: '/apadrinar', session: 'indiferent' },
  { label: 'Preguntas', icon: <FaQuestionCircle />, path: '/questions', session: 'indiferent' },
  { label: 'Mis Gatos', icon: <FaCat />, path: '/tusGatos', session: true },

  // Botón de logout (usa onClick para ejecutar logout y navegar)
  { label: 'Cerrar sesion', icon: <FaSignInAlt />, path: '/auth/login', onClick: handleLogout, session: true },

  // Protegidos por permisos de backend (dinámicos por nombre):
  { label: 'Panel Medico', icon: <FaStethoscope />, path: '/medical', session: true, needed_permission: 'Panel Medico' },
  { label: 'Administración', icon: <FaUserShield />, path: '/administration', session: true, needed_permission: 'Administracion' },
];

/** Reglas de visibilidad por sesión y permiso */
const canSee = ({ item, user, testing, permissions }) => {
  const isLogged = !!user;

  // 1) Reglas de sesión
  if (item.session === true && !isLogged && !testing) return false;
  if (item.session === false && isLogged && !testing) return false;

  // 2) Reglas de permisos dinámicos por nombre
  if (!item.needed_permission) return true; // no requiere permiso -> visible

  if (testing) return true; // en testing, no filtramos por permisos
  if (!isLogged || !user?.id_perfil) return false;

  // Buscar el perfil actual en la data del contexto
  // permissions es un array de objetos: { id_perfil, perfil, permissions: { "Panel Medico": true, "Administracion": false, ... } }
  const perfilActual = Array.isArray(permissions)
    ? permissions.find(p => p.id_perfil === user.id_perfil)
    : null;

  if (!perfilActual || !perfilActual.permissions) return false;

  return !!perfilActual.permissions[item.needed_permission];
};

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { permissions, loading } = usePermissions() || { permissions: [], loading: false };

  const testing = import.meta.env.VITE_TESTING === 'true';

  // useMemo must be called unconditionally
  const visibleOptions = useMemo(
    () => menuOptions.filter(opt => canSee({ item: opt, user, testing, permissions })),
    [user, testing, permissions]
  );

  // Si el usuario está logueado y los permisos están cargando, no mostrar nada excepto el loader
  if (user && loading) {
    return (
      <nav className="menu-nav">
        <div className="menu-title"><span>MENU</span></div>
        <div className="menu-loading">Cargando menú...</div>
      </nav>
    );
  }

  // Si el usuario está logueado y loading es true, no mostrar nada (ya cubierto arriba)
  // Si el usuario está logueado y loading es false, mostrar el menú normalmente
  return (
    <nav className="menu-nav">
      <div className="menu-title">
        <span>MENU</span>
      </div>
      <ul className="menu-list">
        {visibleOptions.map(opt => {
          const isActive = location.pathname === opt.path;
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

/** Link estilizado con manejo de onClick (logout) */
const MenuLink = ({ to, children, isActiveBg, onClick }) => {
  const [hover, setHover] = useState(false);
  let linkClass = 'menu-link';
  if (isActiveBg) linkClass += ' active';
  if (hover) linkClass += ' hover';

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      e.stopPropagation();
      onClick();
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
