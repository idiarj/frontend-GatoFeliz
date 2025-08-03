import Head from '../../../components/head.jsx';
import Menu from '../../../components/menu.jsx';
import './dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Head title="Bienvenido a Gato Feliz Venzuela" />
      {/* Layout principal */}
      <div className="dashboard-layout">
        <div className="dashboard-sidebar">
        </div>
        <div className="dashboard-content">
          {/* Aquí puedes renderizar el contenido principal del dashboard */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
