import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Head from '../../../components/head/head.jsx';
import Menu from "../../../components/menu/menu.jsx";
import './dashboard.css';

import logoIcono from '../../../assets/images/logoicono.png';
import michi1siames from '../../../assets/michis/michi1siames.png';
import michi2blancoynegro from '../../../assets/michis/michi2blancoynegro.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const [lastAdoptionId, setLastAdoptionId] = useState(null);

  useEffect(() => {
    fetch('/api/adoptions/last')
      .then(res => res.json())
      .then(data => setLastAdoptionId(data.id))
      .catch(() => setLastAdoptionId('N/A'));
  }, []);

  return (
    <div className="dashboard-container">
      <Menu className="dashboard-sidebar" />
      <div className="dashboard-main">
        <div className="dashboard-header-container">
          <div className="dashboard-header">
            <span className="menu-trigger">menu &gt;</span>
            <h1>Bienvenido a Gato Feliz Venezuela</h1>
          </div>
          <img src={logoIcono} alt="Logo" className="dashboard-logo" />
        </div>

        <div className="dashboard-sections">
          {/* Adopciones */}
          <div className="dashboard-section adopciones" onClick={() => navigate('/adoption')}>
            <h2>Adopciones</h2>
            <img src={michi1siames} alt="Adopción" />
            <div className="dashboard-section-info">
              <span>Nina | Hembra | 1 año aprox</span>
              <span>Último ID: {lastAdoptionId}</span>
              <span className="dashboard-link">Ver más...</span>
            </div>
          </div>

          {/* Donaciones */}
          <div className="dashboard-section donaciones" onClick={() => navigate('/donations')}>
            <h2>Donaciones</h2>
            <div className="dashboard-section-info">
              <span>Método de pago</span>
              <span>Zelle | Pago móvil | PayPal</span>
              <span>También puedes donar:</span>
              <span>Alimento, Medicinas, Productos de limpieza...</span>
              <span className="dashboard-link">Cada aporte cuenta</span>
            </div>
          </div>

          {/* Apadrinar */}
          <div className="dashboard-section apadrinar" onClick={() => navigate('/apadrinar')}>
            <img src={michi2blancoynegro} alt="Apadrinar" />
            <div className="dashboard-section-info">
              <span>¿No puedes adoptar pero quieres ofrecerle amor y estabilidad a un gatito?</span>
              <span className="dashboard-link">Apadrinar</span>
            </div>
          </div>

          {/* Preguntas */}
          <div className="dashboard-section preguntas" onClick={() => navigate('/questions')}>
            <h2>Preguntas</h2>
            <div className="dashboard-section-info">
              <span>¿Se puede visitar la fundación?</span>
              <span>¿Solo ayudan gatos?</span>
              <span>¿Cuánto cuesta esterilizar?</span>
            </div>
          </div>

          {/* Contacto de denuncias */}
          <div className="dashboard-section contacto">
            <h3>CONTACTO DE DENUNCIAS POR MALTRATO</h3>
            <span>📞 +58 4129267842</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
