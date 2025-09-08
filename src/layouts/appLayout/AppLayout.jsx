// AppLayout.tsx
import { useLocation, Outlet } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import Menu from '../../components/menu/menu';
import Head from '../../components/head/head';
import './AppLayout.css';
import React from 'react';

function AppLayout() {
  const location = useLocation();
  const { user } = useUser();
  const [search, setSearch] = React.useState('');

  // (Opcional) limpia la búsqueda al cambiar de ruta si no es adopción/apadrinar
  React.useEffect(() => {
    if (!['/adoption', '/apadrinar'].includes(location.pathname)) {
      setSearch('');
    }
  }, [location.pathname]);

  const getTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return user?.nom_usuario
          ? `Bienvenido a Gato Feliz, ${user.nom_usuario}!`
          : 'Bienvenido a Gato Feliz Venezuela!';
      case '/aboutUs':
        return '¿Qué Hacemos?';
      case '/donations':
        return 'Donaciones';
      case '/adoption':
        return 'Adopciones';
      case '/apadrinar':
        return 'Apadrinar';
      case '/questions':
        return 'Preguntas frecuentes';
      case '/misgatos':
        return 'Mis Gatos';
      case '/medical':
        return 'Panel médico';
      case '/administration':
        return 'Administración';
      case '/administration/request':
        return 'Solicitudes de Adopción y Apadrinamiento';
      case '/administration/permission':
        return 'Administrar Permisos';
      case '/administration/rol':
        return 'Administrar Roles';
      case '/profile':
        return 'Perfil de Usuario';
      case '/tusGatos':
        return 'Tus Gatos';
      default:
        return 'Gato Feliz';
    }
  };

  return (
    <div className="app-root">
      <header className="app-head">
        {/* pasa onSearch */}
        <Head title={getTitle()} onSearch={setSearch} />
      </header>

      <aside className="app-aside">
        <Menu />
      </aside>

      <main className="app-main">
        {/* pasa el search al Outlet via contexto */}
        <Outlet context={{ search }} />
      </main>
    </div>
  );
}

export default AppLayout;
