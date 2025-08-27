import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import Menu from '../../components/menu/menu'
import Head from '../../components/head/head'
import './AppLayout.css'




function AppLayout() {
  const location = useLocation();
  const { user } = useUser();

  const getTitle = ()=>{
    switch (location.pathname) {
      case '/dashboard':
        if (user && user.nom_usuario) {
          return `Bienvenido a Gato Feliz, ${user.nom_usuario}!`;
        }
        return 'Bienvenido a Gato Feliz Venezuela!';
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
      default:
        return 'Gato Feliz';
    }
  }

  return (
    <div className="app-root">
      <header className="app-head">
        <Head title={getTitle()} />
      </header>

      <aside className="app-aside">
        <Menu />
      </aside>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )

}

export default AppLayout